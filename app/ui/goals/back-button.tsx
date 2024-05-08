'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="flex items-center gap-2 rounded-lg border border-slate-400  bg-slate-400 px-2 py-2 text-white duration-150 hover:bg-slate-100 hover:text-slate-400"
      onClick={() => router.push('/dashboard/goals')}
    >
      <ArrowLeft />
    </button>
  );
}
