"use client";

import type React from "react";
import type { State } from "../page";
import { useQuery } from "@tanstack/react-query";
import { useQuizStore } from "@/store/quiz-store";
import { useGetQuestions } from "@/lib/api/requests/quiz.requests";
import { me } from "@/lib/api/requests";
import PageLoader from "@/components/elements/page-loader";
import LevelOptions from "./level-options";
import { useState, useEffect, useRef } from "react";
import QuestionCard from "./question-card";
import LevelCompletionDialog from "./level-completion-dialog";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import CorrectContainer from "./correct-container";
import { Clock } from "lucide-react";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

const QuizPage = ({ setCurrentPage }: Props) => {
  const {
    currentLevel,
    currentQuestionCount,
    setCurrentLevel,
    incrementCurrentQuestionCount,
  } = useQuizStore();
  const [showLevelCompletion, setShowLevelCompletion] = useState(false);
  const { data: quizData, isLoading, refetch } = useGetQuestions(currentLevel);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionCardRef = useRef<{ submitCurrentAnswer: () => void } | null>(
    null
  );
  const timeExpiredRef = useRef(false);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const questions = quizData?.data.questions.question;

  useEffect(() => {
    if (timeExpiredRef.current && questionCardRef.current) {
      questionCardRef.current.submitCurrentAnswer();
      timeExpiredRef.current = false;
    }
  });

  useEffect(() => {
    setTimeRemaining(30);
    timeExpiredRef.current = false;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          timeExpiredRef.current = true;
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestionCount, questions]);

  const handleQuestionSubmit = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (currentQuestionCount + 1 >= 10) {
      setShowLevelCompletion(true);
    } else {
      incrementCurrentQuestionCount();
    }
  };

  const handleLevelCompletion = () => {
    setCurrentLevel(currentLevel + 1);
    setShowLevelCompletion(false);
    refetch();
  };

  if (isLoading || userLoading) {
    return <PageLoader />;
  }

  const progressPercentage = ((currentQuestionCount + 1) / 10) * 100;
  const timerPercentage = (timeRemaining / 30) * 100;

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/assets/Guzuha-02.jpg"}
        alt="Quiz Mascot"
        width={300}
        height={300}
      />
      <div className="max-w-4xl w-full my-10 mx-auto grid grid-cols-4 gap-16">
        <LevelOptions />
        <div className="col-span-3 space-y-6">
          <div className="space-y-2">
            <CorrectContainer />
            <Progress value={progressPercentage} className="w-full" />
            <p className="text-sm text-gray-500 text-left">
              Question {currentQuestionCount + 1} of 10
            </p>
          </div>

          {/* Timer display */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-full flex items-center gap-2 mb-4 justify-end">
              <Clock className="h-4 w-4 text-gray-500" />
              <p className="text-gray-500 mt-1">
                Time remaining: {timeRemaining} seconds
              </p>
            </div>
          </div>

          {(questions?.length ?? 0) > 0 && (
            <QuestionCard
              ref={questionCardRef}
              question={questions?.[currentQuestionCount] ?? null}
              onSubmit={handleQuestionSubmit}
            />
          )}
        </div>
        {showLevelCompletion && (
          <LevelCompletionDialog
            level={currentLevel}
            isLoggedIn={!!user}
            onClose={() => setShowLevelCompletion(false)}
            onProceed={handleLevelCompletion}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default QuizPage;
