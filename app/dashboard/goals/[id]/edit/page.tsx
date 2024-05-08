import { getGoalInfoById } from '@/app/lib/data';
import EditGoalForm from '@/app/ui/goals/editForm-goal';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const goalInfo = await getGoalInfoById(id);

  return (
    <main>
      <h1>Edit Goal</h1>
      <EditGoalForm {...goalInfo} />
    </main>
  );
}
