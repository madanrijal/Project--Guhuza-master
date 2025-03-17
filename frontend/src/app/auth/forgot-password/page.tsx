"use client";
import React, { Suspense } from "react";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import MailSuccess from "./_components/MailSuccess";
import PageLoader from "@/components/elements/page-loader";

const Page = () => {
  const [success, setSuccess] = React.useState(false);
  return (
    <Suspense fallback={<PageLoader />}>
      {success ? (
        <MailSuccess />
      ) : (
        <ForgotPasswordForm setSuccess={setSuccess} />
      )}
    </Suspense>
  );
};

export default Page;
