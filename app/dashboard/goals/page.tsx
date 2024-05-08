import GoalCard from '@/app/ui/goals/goal-card';
import NewGoalButton from '@/app/ui/goals/new-goal-button';
import { getGoals } from '@/app/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Goals',
};

export default async function Page() {
  const goals = await getGoals('user@clementchretien.com');
  return (
    <main>
      <header className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold">Your goals</h1>
        <NewGoalButton />
      </header>
      <div className="flex flex-col gap-2">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            id={goal.id}
            title={goal.name}
            description={goal.description}
            emoji={goal.emoji}
            deadline_on={goal.deadline_on}
            target={goal.target}
            sum={goal.sum}
          />
        ))}
      </div>
    </main>
  );
}
