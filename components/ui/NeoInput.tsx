import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const NeoInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    "flex h-12 w-full rounded-xl bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50",
                    "neo-input text-foreground",
                    className
                )}
                {...props}
            />
        );
    }
);
NeoInput.displayName = "NeoInput";
