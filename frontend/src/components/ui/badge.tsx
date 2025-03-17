import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
  {
    variants: {
      variant: {
        success: "bg-green-50 text-green-700",
        info: "bg-blue-50 text-blue-700",
        error: "bg-red-50 text-red-700",
        warning: "bg-yellow-50 text-yellow-700",
        default: "bg-gray-50 text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={clsx(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
