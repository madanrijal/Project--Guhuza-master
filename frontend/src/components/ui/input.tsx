"use client";

import type React from "react";
import { forwardRef } from "react";
import { Label } from "./label";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      icon,
      errorMessage,
      label,
      containerClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div
          className={clsx(
            "relative flex flex-col gap-1 w-full rounded transition-colors duration-200",
            containerClassName
          )}
        >
          {label && <Label className="mb-1">{label}</Label>}
          <input
            {...props}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!errorMessage}
            className={clsx(
              "w-full border border-gray-300 p-2 bg-white text-dark outline-none rounded transition-colors duration-200",
              "placeholder:text-muted-foreground",
              !errorMessage && "focus:ring-1 focus:ring-primary",
              errorMessage &&
                "border-red-500 focus:border-red-500 focus:ring-0",
              disabled && "cursor-not-allowed opacity-50 bg-gray-100",
              className
            )}
          />
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              {icon}
            </div>
          )}
        </div>
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };
