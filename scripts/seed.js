const { db } = require('@vercel/postgres');
const {
  users,
  budgets,
  categories,
  transactions,
  goals,
  goalsTransactions,
} = require('../app/lib/placeholder-data');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        currency VARCHAR(5)
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, currency)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.currency})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedBudgets(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "budgets" table if it doesn't exist
    // The stable_income could be put in users table
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS budgets (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        start_on DATE NOT NULL,
        stable_income DECIMAL(8, 2) NOT NULL,
        user_id UUID NOT NULL,
        CONSTRAINT "fk_budgets_user_id" FOREIGN KEY(user_id) REFERENCES users(id);
      );

    `;

    console.log(`Created "budgets" table`);

    // Insert data into the "budgets" table
    const insertedBudgets = await Promise.all(
      budgets.map(
        (budget) => client.sql`
        INSERT INTO budgets (id, start_on, stable_income, user_id)
        VALUES (${budget.id}, ${budget.start_on}, ${budget.stable_income}, ${budget.user_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedBudgets.length} budgets`);

    return {
      createTable,
      budgets: insertedBudgets,
    };
  } catch (error) {
    console.error('Error seeding budgets:', error);
    throw error;
  }
}

async function seedCategories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "categories" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        emoji VARCHAR(255) NULL,
        color VARCHAR(7) NOT NULL,
        budget_id UUID NOT NULL,
        CONSTRAINT "fk__categories_budget_id" FOREIGN KEY(budget_id) REFERENCES budgets(id);
      );
    `;

    console.log(`Created "categories" table`);

    // Insert data into the "categories" table
    const insertedCategories = await Promise.all(
      categories.map(
        (category) => client.sql`
        INSERT INTO categories (id, name, emoji, color, budget_id)
        VALUES (${category.id}, ${category.name}, ${category.emoji}, ${category.color}, ${category.budget_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCategories.length} categories`);

    return {
      createTable,
      categories: insertedCategories,
    };
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
}

async function seedTransactions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`CREATE TYPE IF NOT EXISTS transaction_type AS ENUM ('in', 'out');`;

    // Create the "transactions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        type transaction_type NOT NULL,
        description VARCHAR(255) NULL,
        amount DECIMAL(8, 2) NOT NULL,
        created_at TIMESTAMP(0) WITH TIME ZONE NOT NULL,
        category_id UUID NOT NULL,
        CONSTRAINT "fk_transactions_category_id" FOREIGN KEY(category_id) REFERENCES categories(id);
      );
    `;

    console.log(`Created "transactions" table`);

    // Insert data into the "transactions" table
    const insertedTransactions = await Promise.all(
      transactions.map(
        (transaction) => client.sql`
        INSERT INTO transactions (id, type, description, amount, created_at, category_id)
        VALUES (${transaction.id}, ${transaction.type}, ${transaction.description}, ${transaction.amount}, ${transaction.created_at}, ${transaction.category_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTransactions.length} transactions`);

    return {
      createTable,
      transactions: insertedTransactions,
    };
  } catch (error) {
    console.error('Error seeding transactions:', error);
    throw error;
  }
}

async function seedGoals(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "goals" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS goals (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        description VARCHAR(255) NULL,
        emoji VARCHAR(255) NULL,
        deadline_on DATE NOT NULL,
        target DECIMAL(8, 2) NOT NULL,
        user_id UUID NOT NULL,
        CONSTRAINT "fk_goals_user_id" FOREIGN KEY(user_id) REFERENCES user(id);
      );
    `;

    console.log(`Created "goals" table`);

    // Insert data into the "goals" table
    const insertedGoals = await Promise.all(
      goals.map(
        (goal) => client.sql`
        INSERT INTO goals (id, name, description, emoji, deadline_on, target, user_id)
        VALUES (${goal.id}, ${goal.name}, ${goal.description}, ${goal.emoji}, ${goal.deadline_on}, ${goal.target}, ${goal.user_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedGoals.length} transactions`);

    return {
      createTable,
      goals: insertedGoals,
    };
  } catch (error) {
    console.error('Error seeding goals:', error);
    throw error;
  }
}

async function seedGoalsTransactions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`CREATE TYPE IF NOT EXISTS transaction_type AS ENUM ('in', 'out');`;

    // Create the "goals" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS goals_transactions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        type transaction_type NOT NULL,
        description VARCHAR(255) NULL,
        amount DECIMAL(8, 2) NOT NULL,
        created_at TIMESTAMP(0) WITH TIME ZONE NOT NULL,
        goal_id UUID NOT NULL,
        CONSTRAINT "fk_goals_transactions_goal_id" FOREIGN KEY(goal_id) REFERENCES goals(id);
      );
    `;

    console.log(`Created "goals_transactions" table`);

    // Insert data into the "goals_transactions" table
    const insertedGoalsTransactions = await Promise.all(
      goalsTransactions.map(
        (goalTransaction) => client.sql`
        INSERT INTO goals_transactions (id, type, description, amount, created_at, goal_id)
        VALUES (${goalTransaction.id}, ${goalTransaction.type}, ${goalTransaction.description}, ${goalTransaction.amount}, ${goalTransaction.created_at}, ${goalTransaction.goal_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(
      `Seeded ${insertedGoalsTransactionss.length} goals_transactions`,
    );

    return {
      createTable,
      goalTransaction: insertedGoalsTransactions,
    };
  } catch (error) {
    console.error('Error seeding goals_transactions:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedBudgets(client);
  await seedCategories(client);
  await seedTransactions(client);
  await seedGoals(client);
  await seedGoalsTransactions(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
