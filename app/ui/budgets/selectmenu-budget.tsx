'use client';

import { ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getBudgetIdByDate } from '@/app/lib/data';

interface SelectBudgetMenuProps {
  budgetsDate: { start_on: string }[];
}

function formatDate(date: string) {
  const [month, year] = date.split('/');
  return `${year}-${month}-01`;
}

export default function SelectBudgetMenu({
  budgetsDate,
}: SelectBudgetMenuProps) {
  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const budgetId = await getBudgetIdByDate(formatDate(e.target.value));
    router.push(`/dashboard/budgets/${budgetId.id}`);
  };

  const router = useRouter();

  return (
    <div className="relative w-72 max-w-full">
      <select
        className="peer w-full appearance-none rounded-lg border bg-white px-3 py-2 text-sm text-gray-600 shadow-sm outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        onChange={handleSelect}
      >
        {[...budgetsDate]
          .sort(
            (a, b) =>
              new Date(b.start_on).getTime() - new Date(a.start_on).getTime(),
          )
          .map((budgetDate, id) => (
            <option key={id}>
              {new Date(budgetDate.start_on).toLocaleString('en-US', {
                month: '2-digit',
                year: 'numeric',
              })}
            </option>
          ))}
      </select>
      <ChevronsUpDown className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-600 peer-focus:text-indigo-600" />
    </div>
  );
}
