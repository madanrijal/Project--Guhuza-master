import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quiz-store";
import { useCreateLeaderboardEntry } from "@/lib/api/requests/quiz.requests";
import { State } from "../page";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

interface LevelCompletionDialogProps extends Props {
  level: number;
  isLoggedIn: boolean;
  onClose: () => void;
  onProceed: () => void;
}
const LevelCompletionDialog: React.FC<LevelCompletionDialogProps> = ({
  level,
  isLoggedIn,
  onClose,
  onProceed,
  setCurrentPage,
}) => {
  const router = useRouter();
  const {
    setIsRedirected,
    setCurrentQuestionCount,
    setEndTime,
    currentLevel,
    startTime,
    endTime,
    correctAnswerCount,
    setRedirectToCongratulations,
  } = useQuizStore();
  const createLeaderboardEntry = useCreateLeaderboardEntry();

  const handleProceed = () => {
    setEndTime();
    if (isLoggedIn) {
      createLeaderboardEntry.mutate({
        score: correctAnswerCount,
        startTime: startTime?.toString() || Date.now().toString(),
        endTime: endTime?.toString() || Date.now().toString(),
        level: level,
      });
      if (currentLevel === 5) {
        // setRedirectToCongratulations(true);
        router.push("/congratulations");
      } else {
        onProceed();
        setCurrentQuestionCount(0);
      }
    } else {
      setIsRedirected(true);
      router.push("/auth/login");
    }
  };

  const handleBack = () => {
    setCurrentPage("landing");
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Level {level} Completed!</DialogTitle>
          <DialogDescription>
            Congratulations! You've completed level {level}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleBack}>Go Back</Button>
          {isLoggedIn ? (
            <Button onClick={handleProceed}>
              {currentLevel === 5 ? "View Results" : "Proceed to Next Level"}
            </Button>
          ) : (
            <Button onClick={handleProceed}>Login to Continue</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LevelCompletionDialog;
