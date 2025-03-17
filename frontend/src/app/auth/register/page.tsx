"use client";
import React from "react";
import RegisterForm from "./_components/RegisterForm";
import OtpForm from "../login/_components/OtpForm";

const page = () => {
  const [showOtpForm, setShowOtpForm] = React.useState(false);
  const [email, setEmail] = React.useState("");
  return (
    <>
      {!showOtpForm && (
        <RegisterForm setEmail={setEmail} setShowOtpForm={setShowOtpForm} />
      )}
      {showOtpForm && <OtpForm email={email} />}
    </>
  );
};

export default page;
