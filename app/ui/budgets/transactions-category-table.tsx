import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/ui/table';
import { getCategoryTransactions } from '@/app/lib/data';
import { Transaction } from '@/app/lib/definitions';

interface CategoryTransactionsTableProps {
  id: string;
}

function getSum(transactions: Transaction[]) {
  let sum = 0;
  transactions?.forEach((transaction) => {
    if (transaction.type === 'in') sum += transaction.amount;
    else sum -= transaction.amount;
  });
  return -sum;
}

export async function CategoryTransactionsTable(
  params: CategoryTransactionsTableProps,
) {
  const categoryTransactions = await getCategoryTransactions(params.id);
  return (
    <Table>
      <TableCaption>A list of your transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoryTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">
              {new Date(transaction.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>{transaction.type}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell className="text-right">
              ${Intl.NumberFormat('en-US').format(transaction.amount)}
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            ${Intl.NumberFormat('en-US').format(getSum(categoryTransactions))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}