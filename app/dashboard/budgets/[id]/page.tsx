import { notFound } from 'next/navigation';
import { getBudgetById, getCategoriesByBudgetId } from '@/app/lib/data';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Budgets',
};

const BudgetPiChart = dynamic(
  () => import('@/app/ui/budgets/piChart-budget'),
  { ssr: false }
)

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const budget = await getBudgetById(id);
  const categoriesData = (await getCategoriesByBudgetId(id)).map(category =>({
    ...category,
    value: parseFloat(category.value.toString())
  }));

  if (!budget) {
    notFound();
  }

  return (
    <main>
      <h2 className="text-center text-lg font-semibold">
        Your budget for{' '}
        {new Date(budget.start_on).toLocaleString('en-US', {
          month: '2-digit',
          year: 'numeric',
        })}
      </h2>
      <div className='flex justify-center'>
        <BudgetPiChart data={categoriesData} />
      </div>
    </main>
  );
}
