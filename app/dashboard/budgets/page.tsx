import { getLatestBudgetsId } from '@/app/lib/data';
import { RedirectType, redirect } from 'next/navigation';

export default async function Page() {
  const latestId = await getLatestBudgetsId('user@clementchretien.com');
  redirect(`/dashboard/budgets/${latestId.id}`, RedirectType.replace);
}
