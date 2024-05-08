'use client';

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/app/ui/card';
import { useRouter } from 'next/navigation';

interface GoalCardProps {
  id: string;
  title: string;
  description: string;
  emoji: string;
  deadline_on: string;
  target: number;
  sum: number;
}

function GoalCard({ ...goal }: GoalCardProps) {
  const router = useRouter();
  return (
    <Card
      className="cursor-pointer"
      onClick={() => router.push(`/dashboard/goals/${goal.id}`)}
    >
      <CardHeader>
        <CardTitle>
          {goal.title} {goal.emoji}
        </CardTitle>
        <CardDescription>{goal.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-5">
          <p className="text-sm">Deadline</p>
          <p className="text-sm text-muted-foreground">
            {new Date(goal.deadline_on).toLocaleDateString()}
          </p>
        </div>
        <div className="">
          <p className="text-sm">Target Amount</p>
          <p className="text-sm text-muted-foreground">
            {goal.sum}/{goal.target}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default GoalCard;
