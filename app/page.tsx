'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { getUserName } from './lib/data';

async function printUserName(email: string) {
  const userName = await getUserName(email);
  console.log(userName);
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Welcome to your budget application
      </h1>
      <Link
        href="/login"
        className="flex w-24 items-center justify-between rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Log in
        <ArrowRightIcon className="h-5 w-5 text-center text-white" />
      </Link>
      <button
        className="mt-5 flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => printUserName('user@clementchretien.com')}
      >
        Print user name
      </button>
    </main>
  );
}
