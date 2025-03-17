"use client";

import React, { forwardRef } from "react";
import { cn } from "@/utils/tw-merge";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  containerClassName?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
          type="radio"
          ref={ref}
          disabled={disabled}
          className={cn(
            "h-4 w-4 rounded-full border border-gray-300",
            "checked:bg-primary focus:ring-0",
            "transition-colors duration-200",
            error && "border-destructive focus:0",
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

Radio.displayName = "Radio";

export default Radio;
