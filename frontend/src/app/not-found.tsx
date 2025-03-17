import { Button } from "@/components/ui/button";
import { ArrowLeft } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="h-screen">
      <div className="max-w-lg mx-auto flex flex-col items-center justify-center h-full space-y-5 px-2 md:px-0">
        <div>
          <Image
            src="/assets/not-found.svg"
            alt="404"
            width={400}
            height={400}
          />
        </div>
        <h2 className="text-3xl font-bold text-center">
          Sorry, the page can’t be found
        </h2>
        <p className="text-center">
          The page you were looking for appears to have been moved, deleted or
          does not exist.
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
    </main>
  );
};

export default NotFound;
