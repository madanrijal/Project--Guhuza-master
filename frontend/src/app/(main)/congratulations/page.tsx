"use client";

import React, { useEffect, useState } from "react";
import { useQuizStore } from "@/store/quiz-store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft, RotateCcw } from "lucide-react";
import PageLoader from "@/components/elements/page-loader";

const CongratulationsPage = () => {
  const {
    correctAnswerCount,
    resetQuiz,
    currentLevel,
    setRedirectToCongratulations,
  } = useQuizStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentLevel < 5) {
      router.push("/quiz");
    } else {
      setIsLoading(false);
    }
  }, [currentLevel, router]);

  const totalQuestions = 50;
  const percentage = Math.round((correctAnswerCount / totalQuestions) * 100);

  const handleReset = () => {
    resetQuiz();
    setRedirectToCongratulations(false);
    router.push("/quiz");
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="max-w-7xl overflow-hidden mx-auto py-16">
      <div className="confetti">
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
        <div className="confetti-piece"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white max-w-2xl mx-auto rounded-2xl shadow-xl p-8 text-center relative"
      >
        <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-400" />

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Congratulations!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          You've completed all levels of Guhuza quiz!
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600">
                {correctAnswerCount}
              </p>
              <p className="text-sm text-gray-500">Correct Answers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">
                {totalQuestions}
              </p>
              <p className="text-sm text-gray-500">Total Questions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">
                {percentage}%
              </p>
              <p className="text-sm text-gray-500">Score</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <Button onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CongratulationsPage;
