import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const stackVariants = cva("w-full flex gap-2", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
  },
  defaultVariants: {
    direction: "row",
    align: "center",
    justify: "center",
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  asChild?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, align, justify, ...props }, ref) => {
    return (
      <div
        className={clsx(
          stackVariants({ direction, align, justify }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Stack.displayName = "Stack";

export { Stack, stackVariants };
