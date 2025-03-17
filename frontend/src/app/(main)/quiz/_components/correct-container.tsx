import { useQuizStore } from "@/store/quiz-store";
import React from "react";

const CorrectContainer = () => {
  const { currentLevel, currentQuestionCount, correctAnswerCount } =
    useQuizStore();
  let totalQuestions = 0;
  if (currentLevel === 1) {
    totalQuestions = Number(currentQuestionCount);
  } else {
    totalQuestions =
      Number(currentLevel - 1) * 10 + Number(currentQuestionCount);
  }
  return (
    <div className="mb-4 flex justify-end">
      <div>
        {correctAnswerCount} of {totalQuestions} Correct Answers
      </div>
    </div>
  );
};

export default CorrectContainer;
