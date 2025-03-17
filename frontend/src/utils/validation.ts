export function isTextEmpty(items: string[]): boolean {
  return items.some((item) => item.trim() === "");
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidFile(
  file: File | null,
  allowedExtensions: string[]
): boolean {
  if (!file) return false;
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  return allowedExtensions.includes(extension);
}

export function isValidVideo(file: File): boolean {
  //
  const videoExtensions = ["mp4", "mov", "avi", "mkv", "flv"];
  return isValidFile(file, videoExtensions);
}

export function isValidURL(url: string): boolean {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(url);
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}
