import { useQuizStore } from "@/store/quiz-store";
import { cn } from "@/utils/tw-merge";
import React from "react";

const LevelOptions = () => {
  const levels = [1, 2, 3, 4, 5];
  const { currentLevel } = useQuizStore();

  return (
    <div className="space-y-4 w-50">
      {levels.map((level) => (
        <div
          key={level}
          className={cn(
            "p-3 rounded-lg shadow border border-gray-100 transition-colors",
            currentLevel === level
              ? "bg-white border-2 border-indigo-400 text-indigo-800"
              : "bg-white"
          )}
        >
          Level {level}
        </div>
      ))}
    </div>
  );
};

export default LevelOptions;
