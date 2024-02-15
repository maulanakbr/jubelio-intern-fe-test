import { cn } from '@/lib';

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse bg-muted', className)}
      {...props}
    />
  );
}
