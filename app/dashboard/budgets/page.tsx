import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Budgets',
};

export default function Page() {
  return (
    <main>
      <h1 className="text-center text-xl font-bold">
        Welcome to your Budgets Page
      </h1>
    </main>
  );
}
