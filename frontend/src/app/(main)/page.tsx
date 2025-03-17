"use client";

import React, { useEffect, useRef } from "react";
import HeroSection from "./_components/HeroSection";
import Features from "./_components/Featured";
import About from "./_components/About";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const HomeContent = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("scroll") === "about") {
      aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  return (
    <>
      <HeroSection />
      <Features />
      <div id="about" ref={aboutRef}>
        <About />
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
