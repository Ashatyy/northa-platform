const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateSchemas() {
  console.log("Updating service schemas...");
  await prisma.service.updateMany({
    data: {
      metadataSchema: {
        type: "object",
        properties: {
          notes: {
            type: "string",
            description: "Additional notes or specific requirements for this service"
          }
        }
      }
    }
  });
  console.log("Service schemas updated.");
}

updateSchemas().catch(console.error).finally(() => prisma.$disconnect());
