"use client";
import React, { useState, useEffect } from "react";
import QuizLanding from "./_components/landing";
import QuizPage from "./_components/quiz-page";

export type State = "landing" | "quiz" | "result";

export default function Quiz() {
  const [currentPage, setCurrentPage] = useState<State>("landing");

  return (
    <>
      {currentPage === "landing" && (
        <QuizLanding setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "quiz" && <QuizPage setCurrentPage={setCurrentPage} />}
    </>
  );
}
