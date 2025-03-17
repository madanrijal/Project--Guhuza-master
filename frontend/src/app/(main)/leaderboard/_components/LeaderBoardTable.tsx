"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetLeaderboard } from "@/lib/api/requests/quiz.requests";
import Image from "next/image";
import { Star } from "lucide-react";

const LeaderBoardTable = () => {
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
    <div className="flex flex-col items-center justify-center">
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

      {/* Leaderboard Table */}
      <div className="w-full max-w-4xl mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-4 border">Avatar</th>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Level</th>
              <th className="py-2 px-4 border">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry) => (
              <tr key={entry.id} className="text-center border-b">
                {/* Avatar */}
                <td className="py-2 px-4 border">
                  <img
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${entry.user.fullName}`}
                    alt={entry.user.fullName}
                    className="h-10 w-10 rounded-full mx-auto"
                  />
                </td>

                {/* Username */}
                <td className="py-2 px-4 border font-semibold">
                  {entry.user.fullName}
                </td>

                {/* Level (Stars) */}
                <td className="py-2 px-4 flex gap-2">
                  <span className="flex items-center justify-center">
                    {" "}
                    <span className="flex mt-2 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={
                            i < entry.level
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </span>
                  </span>
                </td>

                {/* Score */}
                <td className="py-2 px-4 border font-bold text-indigo-600">
                  {entry.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoardTable;

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
