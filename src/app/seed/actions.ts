"use server";

import { createClient } from "@/utils/supabase/server";

export async function seedUsers() {
  const supabase = await createClient();

  const dummyUsers = [
    // Admins
    { email: "admin1@northa.com", password: "password123", role: "admin" },
    { email: "admin2@northa.com", password: "password123", role: "admin" },
    { email: "admin3@northa.com", password: "password123", role: "admin" },
    // Staff
    { email: "staff1@northa.com", password: "password123", role: "staff" },
    { email: "staff2@northa.com", password: "password123", role: "staff" },
    { email: "staff3@northa.com", password: "password123", role: "staff" },
    // Clients
    { email: "client1@northa.com", password: "password123", role: "client" },
    { email: "client2@northa.com", password: "password123", role: "client" },
    { email: "client3@northa.com", password: "password123", role: "client" },
  ];

  let createdCount = 0;
  let errors = [];

  for (const u of dummyUsers) {
    const { data, error } = await supabase.auth.signUp({
      email: u.email,
      password: u.password,
      options: {
        data: {
          role: u.role,
        },
      },
    });

    if (error) {
      errors.push(`${u.email}: ${error.message}`);
    } else {
      // NOTE: If Email Confirmations are ON, users won't be auto-confirmed.
      createdCount++;
    }
    
    // Slight delay to prevent rate limits
    await new Promise(r => setTimeout(r, 200));
  }

  if (errors.length > 0) {
    return { success: false, message: `Failed to create some users: ${errors.join(", ")}` };
  }

  return { success: true, message: `Successfully seeded ${createdCount} users!` };
}
