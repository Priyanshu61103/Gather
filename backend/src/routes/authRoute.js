import express from "express";
import { authGoogleController, authLoginController, authSignUpController } from "../controllers/authController.js";
import { otpVerifyMiddleware } from "../middlewares/otpVerifyMiddleware.js";
import { passwordHashingMiddleware } from "../middlewares/passwordHashingMidleware.js";
const authRoute = express.Router();

authRoute.post("/api/auth/signup",otpVerifyMiddleware,passwordHashingMiddleware,authSignUpController);
authRoute.post("/api/auth/login",authLoginController);
authRoute.post("/api/auth/google",authGoogleController);
export default authRoute;