import { Button } from "@/components/ui/button";
import { ArrowLeft } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MailSuccess = () => {
  return (
    <div className="max-w-lg mx-auto flex flex-col items-center justify-center space-y-5 px-2 md:px-0">
      <div>
        <Image
          src="/assets/mail-success.svg"
          alt="404"
          width={200}
          height={200}
        />
      </div>
      <h2 className="text-2xl font-bold text-center">
        Mail sent successfully !
      </h2>
      <p className="text-center text-gray-600">
        We have sent you an email with instructions to reset your password.
      </p>
      <div className="flex flex-col gap-4">
        <Link href="/">
          <Button size={"lg"}>
            <ArrowLeft className="w-4 stroke-white h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MailSuccess;
