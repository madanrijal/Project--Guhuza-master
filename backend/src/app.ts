import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";

import * as middleware from "./middlewares/logger.middleware";
import { frontendUrl } from "./config";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

app.use(middleware.logger);

app.use("/api/users", routes.userRoutes);
app.use("/api/leaderboard", routes.quizRoutes);
app.use("/api/questions", routes.questionRoutes);

export default app;
