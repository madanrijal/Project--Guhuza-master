"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal } from "lucide-react";
import { useGetLeaderboard } from "@/lib/api/requests/quiz.requests";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const Leaderboard = () => {
  const { data, isLoading, isError } = useGetLeaderboard();

  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="mt-10 text-center text-red-600">
        Error loading leaderboard data.
      </div>
    );
  }

  const leaderboardData = data?.data.leaderboard || [];
  if (leaderboardData.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-8">
      <div className="bg-white grow overflow-y-scroll scrollbar-hide shadow-sm rounded my-10">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
          <h2 className="text-2xl font-bold text-white text-center">
            Leaderboard
          </h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {leaderboardData.map((entry, index) => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-center p-4 ${
                index < 2 ? "bg-gradient-to-r from-yellow-50 to-yellow-100" : ""
              }`}
            >
              <div className="flex-shrink-0 mr-4">
                {index === 0 && <Trophy className="w-8 h-8 text-yellow-400" />}
                {index === 1 && <Medal className="w-8 h-8 text-gray-400" />}
                {index > 1 && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                    {index + 1}
                  </div>
                )}
              </div>
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${entry.user.fullName}`}
                  alt={entry.user.fullName}
                />
                <AvatarFallback>{entry.user.fullName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">
                  {entry.user.fullName}
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <p className="text-lg font-semibold text-indigo-600">
                  {entry.score}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="w-80 relative mt-10">
        <div className="speech-bubble bg-white p-4 rounded-lg shadow-lg mb-4 relative">
          <p className="text-gray-800">
            Keep up the great work! Can you make it to the top of our
            leaderboard? 🏆
          </p>
        </div>
        <Image
          src="/assets/Guzuha-02.jpg"
          alt="Quiz Mascot"
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

const LeaderboardSkeleton = () => {
  return (
    <div className="bg-white overflow-y-scroll scrollbar-hide shadow rounded my-16">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
        <h2 className="text-2xl font-bold text-white text-center">
          Leaderboard
        </h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {[...Array(5)].map((_, index) => (
          <li key={index} className="flex items-center p-4">
            <div className="flex-shrink-0 mr-4">
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full mr-4" />
            <div className="flex-grow">
              <Skeleton className="h-4 w-24 mb-2" />
            </div>
            <div className="flex-shrink-0 ml-4">
              <Skeleton className="h-6 w-12" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
