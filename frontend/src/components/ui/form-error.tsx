import { cn } from "@/utils/tw-merge";
import React from "react";

interface Props {
  className?: string;
  message: string | undefined;
}

const FormErrorMessage = (props: Props) => {
  if (!props.message) {
    return null;
  }
  return (
    <span className={cn(["text-red-500 mt-0.5 text-sm"], props.className)}>
      {props.message}
    </span>
  );
};

export default FormErrorMessage;
