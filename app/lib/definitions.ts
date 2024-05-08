// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  currency: string;
};

export type Budget = {
  id: string;
  start_on: string;
  stable_income: number;
  user_id: string;
};

export type Categ = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  budget_id: string;
};

export type Transaction = {
  id: string;
  type: 'in' | 'out';
  description: string;
  amount: number;
  created_at: string;
  category_id: string;
};

export type Goal = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  deadline_on: string;
  target: number;
  sum: number;
  user_id: string;
};
