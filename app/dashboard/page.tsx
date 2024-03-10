import { signOut } from '@/auth';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Welcome to your Dashboard Page
      </h1>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button
          className="flex justify-between rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={async () => {
            'use server';
            await signOut();
          }}
        >
          Sign Out
        </button>
      </form>
    </main>
  );
}
