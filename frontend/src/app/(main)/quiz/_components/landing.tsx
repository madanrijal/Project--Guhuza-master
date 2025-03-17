import React from "react";
import { State } from "../page";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quiz-store";
import Image from "next/image";
import Link from "next/link";
import Leaderboard from "../../leaderboard/_components/Leaderboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<State>>;
}

const QuizLanding = ({ setCurrentPage }: Props) => {
  const { isRedirected, setIsRedirected, setStartTime } = useQuizStore();

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        <div className="lg:w-1/2">
          <div className="text-center lg:text-left py-8 lg:py-16">
            <h1 className="text-3xl font-extrabold sm:text-5xl mt-6">
              Welcome to{" "}
              <strong className="font-extrabold text-red-700">
                Guhuza Quiz
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Test your knowledge with Guhuza Quiz! Challenge yourself with
              exciting questions and see how well you score. Ready to begin?{" "}
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <Button
                onClick={() => {
                  setIsRedirected(false);
                  setCurrentPage("quiz");
                  setStartTime();
                }}
              >
                {isRedirected ? "Continue Quiz" : "Start Quiz"}
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <Leaderboard />
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle>Welcome to Guhuza</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Guhuza is a web-based game that engages users through the
              job-seeking and hiring process. Compete with other players,
              enhance your skills, and make your dream job search a fun and
              interactive way!
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle>How to Play</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              To start playing, click the Play button in the navigation. You'll
              be guided through various job-seeking scenarios and challenges.
              The goal is to apply, interview, and secure a job while competing
              with other players for the top score!
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsRedirected(false);
                setCurrentPage("quiz");
                setStartTime();
              }}
            >
              Play Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle>Benefits of Playing</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Improve your job-seeking skills</li>
              <li>Network with other players</li>
              <li>Win exciting prizes and rewards</li>
            </ul>
            <Button variant="outline" size="sm" className="mt-4">
              Register Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle>Skills Development</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>
                Practice your professional skills through interactive challenges
                and quests
              </li>
              <li>Learn from real-world scenarios</li>
              <li>Get instant feedback on your progress</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50">
          <CardHeader>
            <CardTitle>Networking</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>
                Connect your professional network in a fun, gamified environment
              </li>
              <li>Connect with other job seekers</li>
              <li>Engage with industry professionals</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardHeader>
            <CardTitle>Interview Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
              <li>Prepare for job interviews with interactive simulations</li>
              <li>Access curated mock interviews</li>
              <li>Improve your interview skills</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuizLanding;
