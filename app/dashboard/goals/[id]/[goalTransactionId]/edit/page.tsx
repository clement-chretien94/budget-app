import { notFound } from 'next/navigation';
import { getGoalTransactionById } from '@/app/lib/data';
import EditTransactionGoalForm from '@/app/ui/goals/editTransactionForm-goal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Transaction',
};

export default async function Page({
  params,
}: {
  params: { id: string; goalTransactionId: string };
}) {
  const goalTransactionId = params.goalTransactionId;
  const goalTransaction = await getGoalTransactionById(goalTransactionId);

  if (!goalTransaction) {
    notFound();
  }

  return (
    <main>
      <h1>Edit Goal Transaction</h1>
      <EditTransactionGoalForm {...goalTransaction} />
    </main>
  );
}
