'use client';

import { Transaction } from '@/app/lib/definitions';
import { CalendarDays, Text, CircleDollarSign } from 'lucide-react';
import { editGoalTransaction } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import moment from 'moment';

export default function EditTransactionGoalForm(goalTransaction: Transaction) {
  const [createdAt, setCreatedAt] = useState(
    moment(new Date(goalTransaction.created_at)).format('DD/MM/YYYY HH:mm:ss'),
  );
  const [description, setDescription] = useState(goalTransaction.description);
  const [amount, setAmount] = useState(goalTransaction.amount);

  const pathName = usePathname();
  const pathParts = pathName.split('/');
  const transactionId = pathParts[pathParts.length - 2] ?? '';
  const goalId = pathParts[pathParts.length - 3] ?? '';
  const editGoalTransactionWithId = editGoalTransaction.bind(
    null,
    transactionId,
    goalId,
  );
  const [errorMessage, dispach] = useFormState(
    editGoalTransactionWithId,
    undefined,
  );

  return (
    <form className="space-y-6" action={dispach}>
      <div>
        <label
          htmlFor="created_at"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose the created date
        </label>
        <div className="relative mt-2">
          <input
            id="created_at"
            name="created_at"
            type="text"
            placeholder="Enter the date of the transaction"
            required
            className="peer block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
          <CalendarDays className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900" />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose the description
        </label>
        <div className="relative mt-2">
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Enter the description of the transaction"
            required
            className="peer block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Text className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900" />
        </div>
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose the amount
        </label>
        <div className="relative mt-2">
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter the amount of the transaction"
            required
            className="peer block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <CircleDollarSign className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900" />
        </div>
      </div>

      <fieldset>
        <legend className="block text-sm font-medium leading-6 text-gray-900">
          Set de transaction status
        </legend>
        <div className="mt-2 rounded-md border-0 px-[14px] py-3 shadow-sm ring-1 ring-inset ring-gray-300">
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                id="in"
                name="type"
                type="radio"
                value="in"
                defaultChecked={goalTransaction.type == 'in'}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              />
              <label
                htmlFor="in"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-xs font-medium text-white"
              >
                In
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="out"
                name="type"
                type="radio"
                value="out"
                defaultChecked={goalTransaction.type == 'out'}
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              />
              <label
                htmlFor="in"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white"
              >
                Out
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      <div className="flex justify-end gap-2">
        <Link
          href={pathName.replace(
            '/' + pathParts[pathParts.length - 2] + '/edit',
            '',
          )}
          className="flex items-center gap-2 rounded-lg border border-gray-400 bg-gray-400 px-2 py-2 text-sm font-semibold text-white duration-150 hover:bg-gray-100 hover:text-gray-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-2 py-2 text-sm font-semibold text-white duration-150 hover:bg-sky-100 hover:text-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
