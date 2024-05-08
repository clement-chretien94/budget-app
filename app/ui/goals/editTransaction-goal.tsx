'use client';

import { Pencil } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function EditTransactionGoalButton(params: { id: string }) {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <button
      className="rounded-lg border px-2 py-2"
      onClick={() => router.push(`${pathName}/${params.id}/edit`)}
    >
      <Pencil />
    </button>
  );
}
