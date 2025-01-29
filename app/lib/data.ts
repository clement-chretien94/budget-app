'use server';

import { sql } from '@vercel/postgres';
import { Budget, PieData, Goal, Transaction, Categ } from './definitions';

export async function getUserName(email: string) {
  try {
    const userName = await sql`SELECT name FROM users WHERE email=${email}`;
    return userName.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch userName.');
  }
}

export async function getLatestBudgetsId(email: string) {
  try {
    const latestId =
      await sql`SELECT b.id FROM budgets b JOIN users u ON b.user_id=u.id WHERE b.start_on=(SELECT MAX(start_on) FROM budgets) AND u.email=${email}`;
    return latestId.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budgets latest id data');
  }
}

export async function getBudgetsDate(email: string) {
  try {
    const busgetsDate = await sql<{
      start_on: string;
    }>`SELECT b.start_on FROM budgets b JOIN users u ON b.user_id=u.id WHERE u.email=${email}`;
    return busgetsDate.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budgets date data');
  }
}

export async function getBudgetById(id: string) {
  try {
    const budget =
      await sql<Budget>`SELECT id, start_on, stable_income FROM budgets WHERE id=${id}`;
    return budget.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budget data');
  }
}

export async function getBudgetIdByDate(date: string) {
  try {
    const budget = await sql`SELECT id FROM budgets WHERE start_on=${date}`;
    return budget.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch budget id from date data');
  }
}

export async function getCategoriesByBudgetId(id: string) {
  try {
    const categories =
      await sql<PieData>`SELECT id, name, amount AS value, emoji, color AS fill FROM categories WHERE budget_id=${id}`;
    return categories.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories data');
  }
}

export async function getCategoryById(id: string) {
  try {
    const categories =
      await sql<Categ>`SELECT id, name, emoji, amount, color FROM categories WHERE id=${id}`;
    return categories.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch category data');
  }
}

export async function getCategoryTransactions(id: string) {
  try {
    const goalTransactions =
      await sql<Transaction>`SELECT id, type, description, amount, created_at FROM transactions WHERE category_id=${id}`;
    return goalTransactions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch category transactions data');
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
