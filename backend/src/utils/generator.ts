import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../config";

const otpGenerator = (): string => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return num.toString();
};

const generateJwt = (email: string, id: string): string => {
  const token = jwt.sign({ email, id } as JwtPayload, jwtSecret as string, {
    expiresIn: "7d",
  });
  return token;
};

const generateRandomSKU = (length = 10) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let sku = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters[randomIndex];
  }
  return sku;
};

const generateSlug = (
  text: string,
  existingSlugs: string[] = [],
  maxLength: number = 150
): string => {
  let slug = text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (slug.length > maxLength) {
  }

  if (existingSlugs.includes(slug)) {
    let counter = 1;
    const originalSlug = slug;
    while (existingSlugs.includes(slug)) {
      const suffix = `-${counter}`;
      const maxBaseLength = maxLength - suffix.length;
      slug = `${originalSlug
        .substring(0, maxBaseLength)
        .replace(/-+$/g, "")}${suffix}`;
      counter++;
    }
  }

  return slug;
};

export { generateRandomSKU, otpGenerator, generateJwt, generateSlug };
