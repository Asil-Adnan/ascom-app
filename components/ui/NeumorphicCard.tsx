import { cn } from "@/lib/utils";

interface NeumorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    inset?: boolean;
}

export function NeumorphicCard({ className, children, inset, ...props }: NeumorphicCardProps) {
    return (
        <div
            className={cn(
                "rounded-3xl bg-[#EFE6E6]",
                inset
                    ? "shadow-[inset_10px_10px_20px_#D3C4C4,inset_-10px_-10px_20px_#FFFFFF]"
                    : "shadow-[12px_12px_24px_#D3C4C4,-12px_-12px_24px_#FFFFFF]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
