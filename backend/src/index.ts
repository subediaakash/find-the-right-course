import express from "express";
import { Request, Response } from "express";
import router from "./routes/courses/courseRoute";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", router);

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
