import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const NeoCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-2xl bg-background neo-raised p-6",
                    className
                )}
                {...props}
            />
        );
    }
);
NeoCard.displayName = "NeoCard";
