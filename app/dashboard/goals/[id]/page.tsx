import { notFound } from 'next/navigation';
import { getGoalById, getGoalNameById } from '@/app/lib/data';
import { GoalTransactionsTable } from '@/app/ui/goals/transactions-goal-table';
import EditButton from '@/app/ui/goals/edit-button';
import DeleteButton from '@/app/ui/goals/delete-button';
import BackButton from '@/app/ui/goals/back-button';
import CreateGoalTransactionButton from '@/app/ui/goals/createTransactions-goal';
import { BadgeGoal } from '@/app/ui/goals/badge-goal';
import { CalendarDays } from 'lucide-react';
import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: {goal.name} {goal.emoji},
// };

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;
  const goalName = await getGoalNameById(id);

  return {
    title: goalName.goal_name,
  };
}

function getCategorie(percentage: number) {
  if (percentage <= 1 / 3) {
    return 'low';
  } else if (percentage <= 2 / 3) {
    return 'medium';
  } else {
    return 'high';
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const goal = await getGoalById(id);

  if (!goal) {
    notFound();
  }

  return (
    <main>
      <header className="mb-5 flex items-center justify-between">
        <BackButton />
        <div className="flex">
          <h1 className="mr-2 text-2xl font-bold">
            {goal.name} {goal.emoji}
          </h1>
          <BadgeGoal variant={getCategorie(goal.sum / goal.target)}>
            {((goal.sum / goal.target) * 100).toFixed(2)}
          </BadgeGoal>
        </div>
        <div className="flex gap-5">
          <DeleteButton />
          <EditButton />
        </div>
      </header>
      <h2 className="font-bold text-slate-500">Description</h2>
      <p className="mb-2">{goal.description}</p>
      <div className="mb-2 flex items-center gap-2">
        <CalendarDays className="text-slate-500" />
        <p>{new Date(goal.deadline_on).toLocaleDateString()}</p>
      </div>
      <h2 className="font-bold text-slate-500">Targeted Value</h2>
      <p className="mb-2">${Intl.NumberFormat("en-US").format(goal.target)}</p>
      <div className="mb-5 flex justify-end">
        <CreateGoalTransactionButton goalId={id} />
      </div>
      <GoalTransactionsTable id={id} />
    </main>
  );
}
