"use client";

import React, { Suspense } from "react";
import LoginForm from "./_components/LoginForm";
import OtpForm from "./_components/OtpForm";
import PageLoader from "@/components/elements/page-loader";

const Page = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <LoginForm />
    </Suspense>
  );
};

export default Page;
