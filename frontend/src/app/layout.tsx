import { productSans } from "@/utils/fonts";
import "./globals.css";
import type { Metadata } from "next";
import { ToastProvider } from "@/contexts/toast-context";
import TanstackProvider from "../contexts/tanstack-context";

export const metadata: Metadata = {
  title: "Next App",
  description: "Digital Commerce is a platform for managing your online store.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TanstackProvider>
        <body className={`${productSans.className} antialiased`}>
          <ToastProvider>{children}</ToastProvider>
        </body>
      </TanstackProvider>
    </html>
  );
}
