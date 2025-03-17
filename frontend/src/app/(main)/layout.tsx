import Footer from "@/components/elements/footer";
import React from "react";
import HeroNav from "./_components/HeroNav";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroNav />
      <article className="grow min-h-[calc(100vh-12rem)]">{children}</article>
      <Footer />
    </main>
  );
};

export default MainLayout;
