import React, { Suspense } from "react";
import SetNewPasswordForm from "./_components/ResetPasswordPage";
import PageLoader from "@/components/elements/page-loader";

const Page = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <SetNewPasswordForm />
    </Suspense>
  );
};

export default Page;
