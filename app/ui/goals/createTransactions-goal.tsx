'use client';

import { Plus } from 'lucide-react';
import { createGoalTransaction } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';

export default function CreateGoalTransactionButton(params: {
  goalId: string;
}) {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-2 py-2 text-sm text-white duration-150 hover:bg-sky-100 hover:text-blue-600"
      onClick={async () => {
        const id = await createGoalTransaction(params.goalId);
        router.push(`/dashboard/goals/${params.goalId}/${id}/edit`);
      }}
    >
      Create Transaction
      <Plus className="size-5" />
    </button>
  );
}
