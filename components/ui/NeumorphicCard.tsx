import { cn } from "@/lib/utils";

interface NeumorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    inset?: boolean;
}

export function NeumorphicCard({ className, children, inset, ...props }: NeumorphicCardProps) {
    return (
        <div
            className={cn(
                "rounded-3xl bg-[#e0e5ec]",
                inset
                    ? "shadow-[inset_9px_9px_16px_rgb(163,177,198,0.6),inset_-9px_-9px_16px_rgba(255,255,255,0.5)]"
                    : "shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
