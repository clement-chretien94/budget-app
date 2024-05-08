'use client';

import { Trash2 } from 'lucide-react';
import { deleteGoal } from '@/app/lib/actions';
import { usePathname } from 'next/navigation';

export default function DeleteButton() {
  const pathName = usePathname();

  return (
    <button
      className="flex items-center gap-2 rounded-lg border border-red-600  bg-red-600 px-2 py-2 text-white duration-150 hover:bg-red-100 hover:text-red-600"
      onClick={() => {
        const goalId = pathName?.split('/').pop();
        if (goalId) {
          deleteGoal(goalId);
        }
      }}
    >
      <Trash2 />
    </button>
  );
}
