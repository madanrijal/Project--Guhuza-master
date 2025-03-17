"use client";
import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/tw-merge";
import { useQuizStore } from "@/store/quiz-store";

interface QuestionCardProps {
  question: {
    question: string;
    answers: string[];
    test_answer: number;
  } | null;
  onSubmit: () => void;
}

const QuestionCard = forwardRef<
  { submitCurrentAnswer: () => void },
  QuestionCardProps
>(({ question, onSubmit }, ref) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const { incrementCorrectAnswerCount } = useQuizStore();

  const handleAnswerSelect = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setIsAnswerSubmitted(true);
      if (selectedAnswer === question?.test_answer) {
        incrementCorrectAnswerCount();
      }
      setTimeout(() => {
        onSubmit();
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
      }, 1000);
    }
  };

  useImperativeHandle(ref, () => ({
    submitCurrentAnswer: () => {
      if (selectedAnswer === null && question && question.answers.length > 0) {
        // Find a wrong answer to select
        const correctAnswerIndex = question.test_answer;
        let wrongAnswerIndex = 0;
        if (question.answers.length > 1) {
          // Find the first index that is not the correct answer
          for (let i = 0; i < question.answers.length; i++) {
            if (i !== correctAnswerIndex) {
              wrongAnswerIndex = i;
              break;
            }
          }
        }

        // Set the selected answer to the wrong answer
        setSelectedAnswer(wrongAnswerIndex);

        // Since we're selecting a wrong answer, we don't increment the correct answer count
        setIsAnswerSubmitted(true);
        setTimeout(() => {
          onSubmit();
          setSelectedAnswer(null);
          setIsAnswerSubmitted(false);
        }, 1000);
      } else if (!isAnswerSubmitted) {
        handleSubmit();
      }
    },
  }));

  if (!question) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <div
            key={index}
            className={cn(
              "px-4 py-5 rounded-lg cursor-pointer transition-colors border-2 border-gray-200 shadow-sm",
              selectedAnswer === index &&
                !isAnswerSubmitted &&
                "border-2 border-indigo-700",
              isAnswerSubmitted &&
                selectedAnswer === index &&
                (selectedAnswer === question.test_answer
                  ? "bg-green-100"
                  : "bg-red-100")
            )}
            onClick={() => handleAnswerSelect(index)}
          >
            {answer}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={selectedAnswer === null || isAnswerSubmitted}
          className="mt-4"
        >
          Submit
        </Button>
      </div>
    </div>
  );
});

QuestionCard.displayName = "QuestionCard";

export default QuestionCard;
