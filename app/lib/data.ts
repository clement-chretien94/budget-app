'use server';

import { sql } from '@vercel/postgres';

export async function getUserName(email: string) {
  try {
    const userName = await sql`SELECT name FROM users WHERE email=${email}`;
    return userName.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch userName.');
  }
}
