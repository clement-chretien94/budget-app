'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
// import { redirect } from 'next/navigation';
// import { sign } from 'crypto';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signUp(
  prevState: string | undefined,
  formData: FormData,
) {
  const parsedCredentials = z
    .object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse(Object.fromEntries(formData));

  if (parsedCredentials.success) {
    const { username, email, password } = parsedCredentials.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await sql`
        INSERT INTO users (name, email, password, currency)
        VALUES (${username}, ${email}, ${hashedPassword}, 'USD')
      `;
      console.log('User created:', email);
    } catch (error) {
      console.error('Failed to create user:', error);
      return 'Failed to create user.';
    }
    await signIn('credentials', formData);
  } else {
    console.error('Invalid credentials:', parsedCredentials.error);
    return 'Invalid credentials.';
  }
}
