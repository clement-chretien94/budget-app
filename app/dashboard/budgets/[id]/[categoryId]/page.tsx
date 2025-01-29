import { notFound } from 'next/navigation';
import { getCategoryById } from '@/app/lib/data';
import type { Metadata } from 'next';
import { CategoryTransactionsTable } from '@/app/ui/budgets/transactions-category-table';

export const metadata: Metadata = {
  title: 'Budgets',
};

export default async function Page({ params }: { params: { categoryId: string } }) {
  const categoryId = params.categoryId;
  const category = await getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <main>
      <h2 className="text-center text-lg font-semibold">{category.name} {category.emoji}</h2>
      <CategoryTransactionsTable id={categoryId} />
    </main>
  );
}