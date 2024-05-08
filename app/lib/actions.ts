'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import moment from 'moment';
import { revalidatePath } from 'next/cache';

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

function convertToISO(dateString: string) {
  const date = moment(dateString, 'DD/MM/YYYY HH:mm:ss');
  return date.toISOString();
}

export async function createGoal(userId: string) {
  try {
    const result = await sql<{ id: string }>`
        INSERT INTO goals (deadline_on, user_id)
        VALUES (${new Date(Date.now()).toISOString()}, ${userId})
        RETURNING id
      `;
    const goalId = result.rows[0];
    console.log('Goal created:', goalId.id);
    revalidatePath(`/dashboard/goals`);
    return goalId.id;
  } catch (error) {
    console.error('Failed to create the goal:', error);
    return 'Failed to create the goal.';
  }
}

export async function deleteGoal(goalId: string) {
  try {
    await sql`
        DELETE FROM goals
        WHERE id=${goalId}
      `;
    console.log('Goal deleted:', goalId);
  } catch (error) {
    console.error('Failed to delete the goal:', error);
    return 'Failed to delete the goal.';
  }
  revalidatePath(`/dashboard/goals`);
  redirect(`/dashboard/goals`);
}

export async function editGoal(
  goalId: string,
  prevState: string | undefined,
  formData: FormData,
) {
  const parsedInformations = z
    .object({
      name: z.string(),
      emoji: z.string().emoji(),
      description: z.string(),
      deadline: z.preprocess(
        (a: unknown) => convertToISO(a as string),
        z.string().datetime(),
      ),
      target: z.coerce.number(),
    })
    .safeParse(Object.fromEntries(formData));

  if (parsedInformations.success) {
    const { name, emoji, description, deadline, target } =
      parsedInformations.data;

    try {
      await sql`
        UPDATE goals
        SET name=${name}, description=${description}, emoji=${emoji}, deadline_on=${deadline}, target=${target}
        WHERE id=${goalId}
      `;
      console.log('Goal udpated:', goalId);
    } catch (error) {
      console.error('Failed to modify the goal information', error);
      return 'Failed to modify the goal information';
    }
    revalidatePath(`/dashboard/goals/${goalId}/edit`);
    revalidatePath(`/dashboard/goals/${goalId}`);
    revalidatePath('/dashboard/goals');
    redirect(`/dashboard/goals/${goalId}`);
  } else {
    console.error('Invalid informations', parsedInformations.error);
    return 'Invalid informations';
  }
}

export async function createGoalTransaction(goalId: string) {
  try {
    const result = await sql<{ id: string }>`
        INSERT INTO goals_transactions (created_at, goal_id)
        VALUES (${new Date(Date.now()).toISOString()}, ${goalId})
        RETURNING id
      `;
    const idTransaction = result.rows[0];
    console.log('Goal transaction created:', idTransaction.id);
    revalidatePath(`/dashboard/goals/${goalId}`);
    return idTransaction.id;
  } catch (error) {
    console.error('Failed to create the goal transaction:', error);
    return 'Failed to create the goal transaction.';
  }
}

export async function deleteGoalTransaction(goalId: string, id: string) {
  try {
    await sql`
        DELETE FROM goals_transactions
        WHERE id=${id}
      `;
    console.log('Goal transaction deleted:', id);
  } catch (error) {
    console.error('Failed to delete the goal transaction:', error);
    return 'Failed to delete the goal transaction.';
  }
  revalidatePath(`/dashboard/goals/${goalId}`);
}

export async function editGoalTransaction(
  id: string,
  goalId: string,
  prevState: string | undefined,
  formData: FormData,
) {
  const parsedInformations = z
    .object({
      created_at: z.preprocess(
        (a: unknown) => convertToISO(a as string),
        z.string().datetime(),
      ),
      description: z.string(),
      amount: z.coerce.number(),
      type: z.enum(['in', 'out']),
    })
    .safeParse(Object.fromEntries(formData));

  if (parsedInformations.success) {
    const { created_at, description, amount, type } = parsedInformations.data;

    try {
      await sql`
        UPDATE goals_transactions
        SET type=${type}, description=${description}, amount=${amount}, created_at=${created_at}
        WHERE id=${id}
      `;
      console.log('Goal transaction udpated:', id);
    } catch (error) {
      console.error('Failed to modify the goal transaction information', error);
      return 'Failed to modify the goal transaction information';
    }
    revalidatePath(`/dashboard/goals/${goalId}/${id}/edit`);
    revalidatePath(`/dashboard/goals/${goalId}`);
    revalidatePath('/dashboard/goals');
    redirect(`/dashboard/goals/${goalId}`);
  } else {
    console.error('Invalid informations', parsedInformations.error);
    return 'Invalid informations';
  }
}
