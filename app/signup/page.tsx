import SignUpForm from '../ui/signup-form';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function LoginPage() {
  return (
    <main>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <SignUpForm />

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
