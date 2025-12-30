import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const NeoButton = forwardRef<HTMLButtonElement, NeoButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
                    "neo-btn",
                    variant === 'primary' && "text-primary hover:text-primary/80",
                    variant === 'secondary' && "text-foreground",
                    variant === 'ghost' && "shadow-none hover:bg-black/5 active:bg-black/10",
                    size === 'sm' && "px-4 py-2 text-sm",
                    size === 'md' && "px-6 py-3 text-base",
                    size === 'lg' && "px-8 py-4 text-lg",
                    className
                )}
                {...props}
            />
        );
    }
);
NeoButton.displayName = "NeoButton";
