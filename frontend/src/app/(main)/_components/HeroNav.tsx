"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Clipboard,
  Check,
  LogOut,
  Loader2,
  LogIn,
  User,
  X,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { me } from "@/lib/api/requests";
import { useLogoutMutation } from "@/lib/api/requests/user.requests";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import ShareDialog from "./ShareDialog";

const HeroNav = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const referralLink = "http://localhost:3000/quiz";

  const logoutMutation = useLogoutMutation();
  const handleLogout = () => logoutMutation.mutate();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    retry: 1,
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  const scrollToAbout = () => {
    router.push("/#about");
  };

  const ReferDialog = () => (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="relative">
          <DialogTitle>Refer a Friend</DialogTitle>
          <DialogDescription>
            Share the link below with your friend.
          </DialogDescription>

          <DialogClose asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>

          <div className="flex items-center gap-2 mt-4">
            <Input disabled className="h-12" value={referralLink} readOnly />
            <Button className="h-12 w-12" onClick={copyToClipboard}>
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

  return (
    <header className="bg-zinc-700">
      <div className="mx-auto flex justify-between h-18 p-4 md:p-0 max-w-7xl items-center gap-8">
        <Link className="block text-teal-600" href={"/"}>
          <Logo />
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-white hover:text-gray-300 py-2">
            Home
          </Link>
          <button
            onClick={scrollToAbout}
            className="text-white hover:text-gray-300 py-2"
          >
            About
          </button>
          <Link href="/quiz" className="text-white hover:text-gray-300 py-2">
            Quiz
          </Link>
          <Link
            href="/leaderboard"
            className="text-white hover:text-gray-300 py-2"
          >
            View Leaderboard
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ShareDialog />

          {isLoading ? (
            <Button variant="secondary" disabled>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading...
            </Button>
          ) : error || !user ? (
            <>
              <ReferDialog />
              <Link href="/auth/login">
                <Button variant="secondary">Login</Button>
              </Link>
            </>
          ) : (
            <>
              <ReferDialog />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback>
                      {user.data.user.fullName
                        ? user.data.user.fullName[0].toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setOpen(true)}>
                    <Clipboard className="mr-2 h-4 w-4" />
                    <span>Refer a Friend</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeroNav;
