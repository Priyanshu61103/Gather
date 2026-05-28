import express from "express";
import { authGoogleController, authLoginController, authSignUpController } from "../controllers/authController.js";
import { otpVerifyMiddleware } from "../middlewares/otpVerifyMiddleware.js";
import { passwordHashingMiddleware } from "../middlewares/passwordHashingMidleware.js";
const authRoute = express.Router();

authRoute.post("/auth/signup",otpVerifyMiddleware,passwordHashingMiddleware,authSignUpController);
authRoute.post("/auth/login",authLoginController);
authRoute.post("/auth/google",authGoogleController);
export default authRoute;