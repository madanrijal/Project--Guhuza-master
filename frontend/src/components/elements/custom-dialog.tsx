"use client";

import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CustomDialogProps = {
  trigger: React.ReactNode;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

const CustomDialog: React.FC<CustomDialogProps> = ({
  trigger,
  title,
  children,
  onClose,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      onClose();
    }
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={handleOpenChange}>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AnimatePresence>
        {open && (
          <AlertDialog.Portal forceMount>
            <AlertDialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/10 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </AlertDialog.Overlay>
            <AlertDialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-[20%] w-[90vw] max-w-[500px] -translate-x-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <AlertDialog.Title className="text-lg font-semibold text-gray-900">
                    {title}
                  </AlertDialog.Title>
                  <AlertDialog.Cancel asChild>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                      <X className="h-4 w-4" />
                    </Button>
                  </AlertDialog.Cancel>
                </div>
                <div className="mt-2">{children}</div>
              </motion.div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
};

export { CustomDialog };
