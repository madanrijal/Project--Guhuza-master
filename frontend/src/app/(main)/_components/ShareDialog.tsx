"use client";
import { Share2, X } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ShareDialogProps {
  title?: string;
  description?: string;
  url?: string;
}

const ShareDialog = ({
  title = "Check out this awesome quiz!",
  description = "I found this amazing quiz. Try it out and see how you score!",
  url,
}: ShareDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      console.log("Web Share API not supported");
    }
  };

  const shareToSocial = (url: string) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="relative">
            <span className="absolute -top-2 -right-2">
              <X className="h-5 w-5" onClick={() => setOpen(false)} />
            </span>
            <DialogTitle>Share with friends</DialogTitle>
            <DialogDescription>
              Share this content with your friends and network
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 p-4 h-auto"
                onClick={() => shareToSocial(facebookShareUrl)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm">Facebook</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 p-4 h-auto"
                onClick={() => shareToSocial(twitterShareUrl)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#1DA1F2"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                <span className="text-sm">Twitter</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 p-4 h-auto"
                onClick={() => shareToSocial(linkedinShareUrl)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#0A66C2"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="text-sm">LinkedIn</span>
              </Button>
            </div>

            {typeof navigator.share === "function" && (
              <Button
                variant="default"
                className="w-full"
                onClick={handleNativeShare}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share using device
              </Button>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or copy link
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <div className="flex items-center">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={shareUrl}
                    readOnly
                  />
                </div>
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                }}
              >
                <span className="sr-only">Copy</span>
                Copy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Button onClick={() => setOpen(true)}>
        <Share2 className="h-5 w-5 mr-2" />
        Share
      </Button>
    </div>
  );
};

export default ShareDialog;
