"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { me } from "@/lib/api/requests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PageLoader from "@/components/elements/page-loader";
import { useToast } from "@/hooks/use-toast";
import { useProfileUpdateMutation } from "@/lib/api/requests/user.requests";
import { useEffect } from "react";
import { UpdateProfileFormData, updateProfileSchema } from "@/schemas/auth";
import { Star } from "lucide-react";

const TOTAL_LEVELS = 5;

export default function Profile() {
  const { showToast } = useToast();
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: me,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (data?.data.user) {
      reset({
        fullName: data.data.user.fullName || "",
        email: data.data.user.email || "",
      });
    }
  }, [data, reset]);

  const updateProfileMutation = useProfileUpdateMutation(
    data?.data.user.id || ""
  );

  const onSubmit = async (formData: UpdateProfileFormData) => {
    try {
      await updateProfileMutation.mutateAsync(formData);
    } catch (error: any) {
      showToast(error.message || "Failed to update profile", "error");
    }
  };

  if (isLoading) return <PageLoader />;

  const user = data?.data.user;
  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const currentLevel = user?.Leaderboard?.[0]?.level || 0;

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="text-base font-medium">{user?.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-base font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-base font-medium">
                    {user?.Leaderboard?.[0]?.score || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Level Progress
                  </p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(TOTAL_LEVELS)].map((_, index) => (
                      <Star
                        key={index}
                        size={20}
                        className={
                          index < currentLevel
                            ? "fill-yellow-500 text-yellow-500"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Update Profile</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-1"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                {...register("fullName")}
                errorMessage={errors.fullName?.message}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                errorMessage={errors.email?.message}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending
                ? "Updating..."
                : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
