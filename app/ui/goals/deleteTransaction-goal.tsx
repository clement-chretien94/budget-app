'use client';

import { Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { deleteGoalTransaction } from '@/app/lib/actions';

export default function DeleteTransactionGoalButton(params: { id: string }) {
  const pathName = usePathname();

  return (
    <button
      className="rounded-lg border px-2 py-2"
      onClick={() => {
        const goalId = pathName?.split('/').pop();
        if (goalId) {
          deleteGoalTransaction(goalId, params.id);
        }
      }}
    >
      <Trash2 />
    </button>
  );
}
