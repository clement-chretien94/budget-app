'use client';

import { PieData } from '@/app/lib/definitions';
import { usePathname, useRouter } from 'next/navigation';
import { PieChart, Pie, Tooltip, LabelList } from 'recharts';

type BudgetPiChartProps = {
  data: PieData[];
};

export default function BudgetPiChart({data}: BudgetPiChartProps) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data}
        onClick={(e: PieData) => router.push(pathName + '/' + e.id)}
        cx="50%"
        cy="50%"
        fill='#fff'
        label
      >
        <LabelList dataKey="emoji" position="inside" />
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
