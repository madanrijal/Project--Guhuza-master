import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuizState {
  isRedirected: boolean;
  redirectToCongratulations: boolean;
  currentLevel: number;
  correctAnswerCount: number;
  startTime: number | null;
  endTime: number | null;
  currentQuestionCount: number;
  setRedirectToCongratulations: (redirectToCongratulations: boolean) => void;
  setCurrentQuestionCount: (count: number) => void;
  setIsRedirected: (isRedirected: boolean) => void;
  setCurrentLevel: (level: number) => void;
  incrementCorrectAnswerCount: () => void;
  setStartTime: () => void;
  setEndTime: () => void;
  incrementCurrentQuestionCount: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      isRedirected: false,
      currentLevel: 1,
      correctAnswerCount: 0,
      startTime: null,
      endTime: null,
      currentQuestionCount: 0,
      redirectToCongratulations: false,
      setRedirectToCongratulations: (redirectToCongratulations) =>
        set({ redirectToCongratulations }),
      setIsRedirected: (isRedirected) => set({ isRedirected }),
      setCurrentLevel: (level) => set({ currentLevel: level }),
      incrementCorrectAnswerCount: () =>
        set((state) => ({ correctAnswerCount: state.correctAnswerCount + 1 })),
      setStartTime: () => set({ startTime: Date.now() }),
      setEndTime: () => set({ endTime: Date.now() }),
      incrementCurrentQuestionCount: () =>
        set((state) => ({
          currentQuestionCount: state.currentQuestionCount + 1,
        })),
      setCurrentQuestionCount: (count) => set({ currentQuestionCount: count }),
      resetQuiz: () =>
        set({
          isRedirected: false,
          currentLevel: 1,
          correctAnswerCount: 0,
          startTime: null,
          endTime: null,
          currentQuestionCount: 0,
        }),
    }),
    {
      name: "quiz-storage",
    }
  )
);
