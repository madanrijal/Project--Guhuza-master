export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function validateImageFile(file: File) {
  if (!file) {
    return "Please select an image file.";
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "File must be a valid image (JPEG, PNG, or WebP).";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size must be less than 5MB.";
  }

  return null;
}

export const validateVideoFile = (file: File): string | null => {
  const maxSize = 100 * 1024 * 1024;
  if (file.size > maxSize) {
    return "File size should not exceed 100MB";
  }
  const acceptedTypes = ["video/mp4", "video/webm", "video/ogg"];
  if (!acceptedTypes.includes(file.type)) {
    return "Only MP4, WebM, and OGG video formats are accepted";
  }
  return null;
};
