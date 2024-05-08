'use client';

import { Pencil } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function EditButton() {
  const router = useRouter();
  const goalId = usePathname().split('/').pop();
  return (
    <button
      className="flex items-center gap-2 rounded-lg border border-blue-600  bg-blue-600 px-2 py-2 text-white duration-150 hover:bg-sky-100 hover:text-blue-600"
      onClick={() => router.push(`/dashboard/goals/${goalId}/edit`)}
    >
      <Pencil />
    </button>
  );
}
