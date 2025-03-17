"use client";

import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AlertDialogProps = {
  trigger: React.ReactNode;
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
  onAction: () => void;
};

const CustomAlertDialog: React.FC<AlertDialogProps> = ({
  trigger,
  title,
  description,
  cancelText,
  actionText,
  onAction,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
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
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <AlertDialog.Title className="text-lg font-semibold text-gray-900">
                      {title}
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mt-2 text-sm text-gray-600">
                      {description}
                    </AlertDialog.Description>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <AlertDialog.Cancel asChild>
                    <Button
                      variant="outline"
                      className="h-9 rounded border-gray-300 px-4 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {cancelText}
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <Button
                      onClick={onAction}
                      className="h-9 rounded bg-red-600 px-4 hover:bg-red-700"
                    >
                      {actionText}
                    </Button>
                  </AlertDialog.Action>
                </div>
              </motion.div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
};

export { CustomAlertDialog };
