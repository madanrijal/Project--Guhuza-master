"use client";

import React, { forwardRef } from "react";
import { cn } from "@/utils/tw-merge";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  containerClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, label, error, containerClassName, disabled, ...props },
    ref
  ) => {
    return (
      <div
        className={cn("flex items-center gap-2", "w-full", containerClassName)}
      >
        <input
          {...props}
          type="checkbox"
          ref={ref}
          disabled={disabled}
          aria-invalid={error || undefined}
          className={cn(
            "h-4 w-4 rounded border border-gray-300",
            "checked:bg-primary focus:0",
            "transition-colors duration-200",
            error && "border-destructive focus:ring-o",
            disabled && "opacity-50 cursor-not-allowed bg-disabled",
            className
          )}
        />
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "text-sm",
              error ? "text-destructive" : "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
