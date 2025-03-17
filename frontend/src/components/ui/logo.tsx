import { cn } from "@/utils/tw-merge";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = {
  className?: string;
};

const Logo = (props: LogoProps & React.SVGProps<SVGSVGElement>) => {
  return <Image src={"/assets/logo.png"} height={150} width={150} alt="logo" />;
};

export default Logo;
