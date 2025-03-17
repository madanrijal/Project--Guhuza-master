"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/schemas/auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/api/requests";

const ForgotPasswordForm = ({
  setSuccess,
}: {
  setSuccess: (value: boolean) => void;
}) => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      if (!data?.success) {
        showToast(data?.message || "Something went wrong !", "error");
      }
      if (data?.success) {
        setSuccess(true);
      }
    },
    onError: (error) => {
      console.error(error.message);
      showToast(error.message || "Something went wrong !", "error");
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    mutate(data.email);
  };

  return (
    <div className="w-sm">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold">Reset your password</h2>
        <p className="text-sm mb-8 mt-2 text-gray-500">
          We will send you a link to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              icon={
                <Mail
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
          <Link href="/auth/login" className="text-[#4F46E5] hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
