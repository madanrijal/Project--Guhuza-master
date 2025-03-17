"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/tw-merge";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, X, TriangleAlert, Info } from "lucide-react";

const toastVariants = cva(
  "relative flex items-start gap-3 shadow rounded overflow-hidden bg-zinc-900/95 backdrop-blur-sm",
  {
    variants: {
      variant: {
        success: "bg-green-100 border-2 border-green-200",
        error: "bg-red-100 border-2 border-red-200",
        warning: "bg-yellow-100 border-2 border-yellow-200",
        info: "bg-blue-100 border-2 border-blue-200",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const iconVariants = cva("size-5", {
  variants: {
    variant: {
      success: "text-green-700",
      error: "text-red-700",
      warning: "text-yellow-700",
      info: "text-blue-700",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

interface ToastProps extends VariantProps<typeof toastVariants> {
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export function Toast({
  title,
  message,
  variant,
  onClose,
  className,
}: ToastProps) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={cn(
        "fixed top-8 left-1/2 transform -translate-x-1/2 z-50",
        toastVariants({ variant }),
        className
      )}
    >
      <div className="flex items-center gap-3 p-4 pr-12 w-full min-w-80">
        {variant === "success" && (
          <CheckCircle2 className={iconVariants({ variant })} />
        )}
        {variant === "error" && (
          <XCircle className={iconVariants({ variant })} />
        )}
        {variant === "warning" && (
          <TriangleAlert className={iconVariants({ variant })} />
        )}
        {variant === "info" && <Info className={iconVariants({ variant })} />}
        <div className="flex flex-col gap-0.5">
          <p className="font-medium leading-none">{title}</p>
          <p className={cn("text-sm", { "text-gray-700": !title })}>
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 transition-colors"
          >
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
