import { baseApiUrl } from "@/constants/api";
const endpoint = "/users";
const url = baseApiUrl + endpoint;

export const userRoutes = {
  register: `${url}/register`,
  verify: `${url}/verify`,
  login: `${url}/login`,
  me: `${url}/me`,
  logout: `${url}/logout`,
  users: url,
  user: (id: string) => `${url}/${id}`,
  forgotPassword: `${url}/forgot-password`,
  resetPassword: `${url}/reset-password`,
  updateProfile: (id: string) => `${url}/${id}`,
};
