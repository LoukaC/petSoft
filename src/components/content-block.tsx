import { cn } from "@/lib/utils";

type contentblockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({
  children,
  className,
}: contentblockProps) {
  return (
    <div
      className={cn(
        "bg-[#F7F8FA] rounded-md shadow-md overflow-hidden w-full h-full",
        className
      )}
    >
      {children}
    </div>
  );
}
