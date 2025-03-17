"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterFormData, registerSchema } from "@/schemas/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "@/lib/api/requests/user.requests";

interface RegisterFormProps {
  setShowOtpForm: (value: boolean) => void;
  setEmail: (value: string) => void;
}

export default function RegisterForm({
  setEmail,
  setShowOtpForm,
}: RegisterFormProps) {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (!data?.success) {
        showToast(data?.message || "Something went wrong!", "error");
      }
      if (data?.success) {
        setEmail(getValues("email"));
        setShowOtpForm(true);
      }
    },
    onError: (error) => {
      console.error(error.message);
      showToast(error.message || "Something went wrong!", "error");
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <div className="w-sm">
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-8">Create an Account</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium">
            Full Name
          </label>
          <div className="relative">
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="pl-10"
              errorMessage={errors.fullName?.message}
              {...register("fullName")}
              icon={<User strokeWidth={1} size={20} />}
            />
          </div>
        </div>

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
              icon={<Lock strokeWidth={1} size={20} />}
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
          Register
        </Button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#4F46E5] hover:underline">
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
}
