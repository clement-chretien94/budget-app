import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        low: 'border-transparent bg-red-600 text-primary-foreground hover:bg-red-600/80',
        medium:
          'border-transparent bg-orange-600 text-primary-foreground hover:bg-orange-600/80',
        high: 'border-transparent bg-green-600 text-destructive-foreground hover:bg-green-600/80',
      },
    },
    defaultVariants: {
      variant: 'low',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function BadgeGoal({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { BadgeGoal, badgeVariants };
