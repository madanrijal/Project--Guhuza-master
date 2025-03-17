"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordFormData } from "@/schemas/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/lib/api/requests";

export default function SetNewPasswordForm() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const router = useRouter();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (!data?.success) {
        showToast(data?.message || "Something went wrong !", "error");
      }
      if (data?.success) {
        showToast("Password updated successfully !", "success");
        router.push("/auth/login");
      }
    },
    onError: (error) => {
      console.error(error.message);
      showToast(error.message || "Something went wrong !", "error");
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;
    mutate({ newPassword: data.password, token });
  };

  return (
    <div className="w-sm h-fit">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-8">Set new password</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              errorMessage={errors.password?.message}
              {...register("password")}
              icon={
                <Lock
                  size={20}
                  strokeWidth={1}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2"
                />
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              errorMessage={errors.confirmPassword?.message}
              {...register("confirmPassword")}
              icon={
                <Lock
                  size={20}
                  strokeWidth={1}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2"
                />
              }
            />
          </div>
        </div>

        <Button
          size="lg"
          className="w-full text-white"
          type="submit"
          disabled={isPending}
        >
          Reset password
        </Button>

        <p className="text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link href="/admin/login" className="text-[#4F46E5] hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
