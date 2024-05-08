'use client';

import { Goal } from '@/app/lib/definitions';
import { CalendarDays, Text, CircleDollarSign } from 'lucide-react';
import { editGoal } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import moment from 'moment';

export default function EditGoalForm(goal: Goal) {
  const [name, setName] = useState(goal.name);
  const [emoji, setEmoji] = useState(goal.emoji);
  const [description, setDescription] = useState(goal.description);
  const [target, setTarget] = useState(goal.target);
  const [deadLine, setDeadLine] = useState(
    moment(new Date(goal.deadline_on)).format('DD/MM/YYYY HH:mm:ss'),
  );

  const pathName = usePathname();
  const editGoalWithId = editGoal.bind(null, goal.id);
  const [errorMessage, dispach] = useFormState(editGoalWithId, undefined);

  return (
    <form className="space-y-6" action={dispach}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose the name
        </label>
        <div className="relative mt-2">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter the name of the goal"
            required
            className="peer block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CalendarDays className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900" />
        </div>
      </div>

      <div>
        <label
          htmlFor="emoji"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose the emoji
        </label>
        <div className="relative mt-2">
          <input
            id="emoji"
            name="emoji"
            type="text"
            placeholder="Enter the emoji of the goal"
            required
            className="peer block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          />
          <Text className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900" />
        </div>
      </div>

      <div>
        <label
          htmlFor="emoji"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose the description
        </label>
        <div className="relative mt-2">
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Enter the description of the goal"
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
          htmlFor="deadline"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose the deadline
        </label>
        <div className="relative mt-2">
          <input
            id="deadline"
            name="deadline"
            type="text"
            placeholder="Enter the deadline of the goal"
            required
            className="peer block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={deadLine}
            onChange={(e) => setDeadLine(e.target.value)}
          />
          <CircleDollarSign className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900" />
        </div>
      </div>

      <div>
        <label
          htmlFor="target"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose the targeted amount
        </label>
        <div className="relative mt-2">
          <input
            id="target"
            name="target"
            type="number"
            placeholder="Enter the targeted amount of the goal"
            required
            className="peer block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          />
          <CircleDollarSign className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 peer-focus:text-gray-900" />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Link
          href={`/dashboard/goals/${goal.id}`}
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
