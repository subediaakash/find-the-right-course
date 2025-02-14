import { Router } from "express";
import { UserAuthController } from "../../controllers/auth/auth.controller";
const authRouter = Router();
const authController = new UserAuthController();

authRouter.post("/signup", (req, res) => authController.signup(req, res));

authRouter.post("/signin", (req, res) => authController.signin(req, res));

export default authRouter;
