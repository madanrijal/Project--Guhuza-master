"use client";

import React, { forwardRef } from "react";
import { cn } from "@/utils/tw-merge";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  containerClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, error, helperText, containerClassName, disabled, ...props },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1 w-full", containerClassName)}>
        <textarea
          {...props}
          ref={ref}
          disabled={disabled}
          aria-invalid={error || undefined}
          className={cn(
            "z-0 w-full bg-white",
            "border border-gray-300",
            "rounded-lg px-2 py-2",
            "transition-colors duration-200",
            "placeholder:text-muted-foreground",
            "focus:border-primary",
            "outline-none",
            error &&
              "border-destructive focus:border-destructive focus:ring-destructive/20",
            disabled && "opacity-50 cursor-not-allowed bg-disabled",
            className
          )}
        />
        {helperText && (
          <p
            id="textarea-helper-text"
            className={cn(
              "text-sm",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
