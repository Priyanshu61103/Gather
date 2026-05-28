import express from "express";
import { otpController } from "../controllers/otpController.js";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";

const otpRoute = express.Router();

otpRoute.post("/otp-creation",otpController);

export default otpRoute;