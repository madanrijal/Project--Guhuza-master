"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/requests/user.requests";
import { useQuizStore } from "@/store/quiz-store";

export default function LoginForm() {
  const { showToast } = useToast();
  const router = useRouter();
  const { isRedirected } = useQuizStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data, "data");
      if (!data?.success) {
        showToast(data?.message || "Something went wrong !", "error");
      }
      if (data?.success) {
        if (isRedirected) {
          router.push("/quiz");
        } else {
          router.push("/");
        }
      }
    },
    onError: (error) => {
      console.error(error.message);
      showToast(error.message || "Something went wrong !", "error");
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="w-sm">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-8">Welcome to Guhuza Quiz</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              errorMessage={errors.email?.message}
              {...register("email")}
              icon={<Mail strokeWidth={1} size={20} />}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Link href="/auth/forgot-password">
              <span className="text-[#4F46E5] hover:underline block text-sm mt-2">
                Forgot password?
              </span>
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              errorMessage={errors.password?.message}
              {...register("password")}
              icon={<Lock strokeWidth={1} size={20} />}
            />
          </div>
        </div>
        <Button
          size={"lg"}
          className="w-full text-white"
          type="submit"
          disabled={isLoading}
        >
          Sign In
        </Button>
        <p className="text-center text-sm text-gray-500">
          No account yet?{" "}
          <Link
            href="/auth/register"
            className="text-[#4F46E5] hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
