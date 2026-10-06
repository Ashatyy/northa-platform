import { PrismaClient, Role, Division, BookingStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding dummy data into database...");

  // Ensure services exist first
  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    console.log("Creating default services...");
    await prisma.service.createMany({
      data: [
        { name: "Heavy Machinery Lease", description: "Lease excavators and bulldozers.", division: "CONSTRUCTION", metadataSchema: { type: "object", properties: { location: { type: "string" }, durationDays: { type: "number" } } } },
        { name: "Offshore Rig Inspection", description: "Safety and compliance check.", division: "OIL_GAS", metadataSchema: { type: "object", properties: { rigId: { type: "string" }, priority: { type: "string", enum: ["Low", "High", "Critical"] } } } },
        { name: "Bulk Fertilizer Order", description: "Order premium fertilizer.", division: "AGRICULTURE", metadataSchema: { type: "object", properties: { quantityTons: { type: "number" }, cropType: { type: "string" } } } },
        { name: "Corporate Retreat Booking", description: "Reserve a hotel wing.", division: "HOSPITALITY", metadataSchema: { type: "object", properties: { guestCount: { type: "number" }, dates: { type: "string" } } } },
      ]
    });
  }

  const services = await prisma.service.findMany();

  // Create dummy clients
  const client1 = await prisma.user.upsert({
    where: { email: 'dummy-client1@example.com' },
    update: {},
    create: { name: 'Acme Corp', email: 'dummy-client1@example.com', role: Role.CLIENT },
  })
  
  const client2 = await prisma.user.upsert({
    where: { email: 'dummy-client2@example.com' },
    update: {},
    create: { name: 'Global Tech', email: 'dummy-client2@example.com', role: Role.CLIENT },
  })

  // Create dummy staff
  const staff1 = await prisma.user.upsert({
    where: { email: 'engineer@northa.com' },
    update: {},
    create: { name: 'John Doe', email: 'engineer@northa.com', role: Role.STAFF, division: Division.CONSTRUCTION },
  })

  // Fetch all real users to attach dummy bookings to the actual logged-in user if they exist
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  
  // If the user has logged in, the first user will be them. Let's give them bookings.
  const targetClients = users.length > 0 ? users : [client1, client2];

  console.log("Creating dummy bookings...");
  
  // Attach 2 pending, 1 confirmed booking to the primary user
  const primaryClient = targetClients[0];
  
  const b1 = await prisma.booking.create({
    data: {
      clientId: primaryClient.id,
      serviceId: services[0].id, 
      status: BookingStatus.PENDING,
      metadata: { location: "Kano Central", durationDays: 14 }
    }
  });

  const b2 = await prisma.booking.create({
    data: {
      clientId: primaryClient.id,
      serviceId: services[1].id,
      status: BookingStatus.CONFIRMED,
      metadata: { rigId: "RIG-992", priority: "High" }
    }
  });

  const b3 = await prisma.booking.create({
    data: {
      clientId: primaryClient.id,
      serviceId: services[2].id,
      status: BookingStatus.COMPLETED,
      metadata: { quantityTons: 50, cropType: "Maize" }
    }
  });

  // Attach some bookings to other dummy clients to fill up the ADMIN view
  const b4 = await prisma.booking.create({
    data: {
      clientId: client2.id,
      serviceId: services[3].id,
      status: BookingStatus.PENDING,
      metadata: { guestCount: 150, dates: "2026-11-01 to 2026-11-15" }
    }
  });
  
  const b5 = await prisma.booking.create({
    data: {
      clientId: client2.id,
      serviceId: services[0].id,
      status: BookingStatus.CANCELLED,
      metadata: { location: "Abuja HQ", durationDays: 5 }
    }
  });

  console.log("Creating dummy schedules...");
  
  // Give the staff member some schedules linked to the bookings
  await prisma.schedule.create({
    data: {
      staffId: staff1.id,
      bookingId: b1.id,
      startTime: new Date(Date.now() + 86400000), // Tomorrow
      endTime: new Date(Date.now() + 90000000)
    }
  });

  await prisma.schedule.create({
    data: {
      staffId: staff1.id,
      bookingId: b2.id,
      startTime: new Date(Date.now() + 172800000), // Day after tomorrow
      endTime: new Date(Date.now() + 180000000)
    }
  });
  
  // If the primary user happens to be staff, give them a schedule too
  if (primaryClient.id !== staff1.id) {
      await prisma.schedule.create({
        data: {
          staffId: primaryClient.id,
          bookingId: b4.id,
          startTime: new Date(Date.now() + 200000000), 
          endTime: new Date(Date.now() + 210000000)
        }
      });
  }

  console.log("Database successfully populated with rich dummy data!");
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
