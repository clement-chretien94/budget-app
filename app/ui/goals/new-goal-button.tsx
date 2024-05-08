'use client';

import { Plus } from 'lucide-react';
import { createGoal } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export default function NewGoalButton() {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-2 rounded-lg border border-blue-600  bg-blue-600 px-2 py-2 text-sm text-white duration-150 hover:bg-sky-100 hover:text-blue-600"
      onClick={async () => {
        const goalId = await createGoal('de659c8b-af60-4cde-9099-b846388a9762');
        router.push(`/dashboard/goals/${goalId}/edit`);
      }}
    >
      <Plus className="size-5" />
      New Goal
    </button>
  );
}
