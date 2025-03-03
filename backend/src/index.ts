import express from "express";
import { Request, Response } from "express";
import courseRouter from "./routes/courses/courseRoute";
import userRouter from "./routes/user/userRoute";
import authRouter from "./routes/auth/authRoute";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);
app.use("/api/user", userRouter);

app.use(
  (err: Error, req: Request, res: Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
