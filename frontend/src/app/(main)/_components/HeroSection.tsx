"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 1.6, ease: "easeOut" },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const Hero = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className="relative bg-white pb-[110px] py-[120px] lg:pt-[150px] px-4 md:px-0"
    >
      <div className="container max-w-screen-xl mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <motion.div variants={fadeInUp} className="w-full px-4 lg:w-5/12">
            <div className="hero-content">
              <motion.h1
                variants={fadeInUp}
                className="mb-5 text-5xl md:text-7xl font-bold !leading-[1.208]"
              >
                Start Quiz with <span className="text-primary">Guhuza</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mb-8 max-w-[480px] text-body-color dark:text-dark-6"
              >
                Start your quiz with Guhuza and test your knowledge with
                exciting questions and see how well you score. Ready to begin?
              </motion.p>
              <motion.ul
                variants={fadeInUp}
                className="flex flex-wrap items-center"
              >
                <li>
                  <Link href="/quiz">
                    <Button>
                      Get Started
                      <ArrowUpRight className="inline-block ml-2" />
                    </Button>
                  </Link>
                </li>
              </motion.ul>
              <motion.div variants={fadeInUp} className="clients pt-16">
                <h6 className="mb-6 flex items-center text-xl font-bold text-body-color dark:text-dark-6">
                  Some Of Our Clients
                  <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                </h6>

                <div className="flex items-center space-x-4">
                  <SingleImage
                    href="#"
                    imgSrc="https://www.guhuza.com/partners/TorontoJobs.ca.jpg"
                  />
                  <SingleImage
                    href="#"
                    imgSrc="https://www.guhuza.com/partners/DMZ.png"
                  />
                  <SingleImage
                    href="#"
                    imgSrc="https://www.guhuza.com/partners/monstor.jpg"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
          <div className="hidden px-4 lg:block lg:w-1/12"></div>
          <motion.div variants={fadeInUp} className="w-full px-4 lg:w-6/12">
            <div className="lg:ml-auto lg:text-right">
              <div className="relative z-10 inline-block pt-11 lg:pt-0">
                <Image
                  src="/assets/team.jpg"
                  alt="hero"
                  width={600}
                  height={400}
                  className="max-w-full lg:ml-auto"
                />
                <span className="absolute -bottom-8 -left-8 z-[-1]">
                  <svg
                    width="93"
                    height="93"
                    viewBox="0 0 93 93"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG circles code */}
                  </svg>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SingleImage = ({ href, imgSrc }: { href: string; imgSrc: string }) => {
  return (
    <a href={href} className="flex w-full items-center justify-center">
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt="brand image"
        width={100}
        height={50}
        className="h-fit w-full"
      />
    </a>
  );
};

export default Hero;
