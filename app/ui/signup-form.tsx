'use client';

import {
  KeyIcon,
  AtSymbolIcon,
  UserIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import { signUp } from '@/app/lib/actions';
import { useState } from 'react';

export default function SignUpForm() {
  const [errorMessage, dispach] = useFormState(signUp, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6" action={dispach}>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>
        <div className="relative mt-2">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Enter your username"
            required
            className="peer block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <UserIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900" />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="relative mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            required
            className="peer block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <AtSymbolIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900" />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter password"
            required
            minLength={6}
            className="peer block w-full rounded-md border-0 px-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <KeyIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900" />
          {showPassword ? (
            <EyeSlashIcon
              className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeIcon
              className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      <SignUpButton />

      {errorMessage && (
        <div
          className="flex items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      <button
        className="flex w-full justify-between rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        aria-disabled={pending}
      >
        Sign up <ArrowRightIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
