'use server';

import { sql } from '@vercel/postgres';
import { Goal, Transaction } from './definitions';

export async function getUserName(email: string) {
  try {
    const userName = await sql`SELECT name FROM users WHERE email=${email}`;
    return userName.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch userName.');
  }
}

export async function getGoals(email: string) {
  try {
    const goals =
      await sql<Goal>`SELECT g.id, g.name, g.description, g.emoji, g.deadline_on, g.target, COALESCE((SELECT SUM(
        CASE
          WHEN type='in' THEN amount
          WHEN type='out' THEN -amount
          ELSE 0
        END
      )
      FROM goals_transactions WHERE goal_id=g.id), 0) AS sum
    FROM goals g JOIN users u ON g.user_id=u.id WHERE u.email=${email}`;
    return goals.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goals data');
  }
}

export async function getGoalById(id: string) {
  try {
    const goal =
      await sql<Goal>`SELECT g.id, g.name, g.description, g.emoji, g.deadline_on, g.target, (SELECT SUM(
        CASE
          WHEN type='in' THEN amount
          WHEN type='out' THEN -amount
          ELSE 0
        END
      )
      FROM goals_transactions WHERE goal_id=g.id)
    FROM goals g WHERE g.id=${id}`;
    return goal.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goal data');
  }
}

export async function getGoalInfoById(id: string) {
  try {
    const goal = await sql<Goal>`
        SELECT g.id, g.name, g.description, g.emoji, g.deadline_on, g.target
        FROM goals g WHERE g.id=${id}
      `;
    return goal.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goalInfo data');
  }
}

export async function getGoalNameById(id: string) {
  try {
    const goalName = await sql<{
      goal_name: string;
    }>`SELECT (g.name || ' ' || g.emoji) AS goal_name FROM goals g WHERE g.id=${id}`;
    return goalName.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goal name');
  }
}

export async function getGoalTransactions(id: string) {
  try {
    const goalTransactions =
      await sql<Transaction>`SELECT id, type, description, amount, created_at FROM goals_transactions WHERE goal_id=${id}`;
    return goalTransactions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goal transactions data');
  }
}

export async function getGoalTransactionById(id: string) {
  try {
    const goalTransactions =
      await sql<Transaction>`SELECT id, type, description, amount, created_at FROM goals_transactions WHERE id=${id}`;
    return goalTransactions.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goal transaction data');
  }
}
