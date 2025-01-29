import { getBudgetsDate } from '@/app/lib/data';
import SelectBudgetMenu from '@/app/ui/budgets/selectmenu-budget';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const budgetsDate = await getBudgetsDate('user@clementchretien.com');
  return (
    <>
      <header className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold">Your budgets</h1>
        <SelectBudgetMenu budgetsDate={budgetsDate} />
      </header>
      {children}
    </>
  );
}
