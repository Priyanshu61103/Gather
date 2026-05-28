import express from "express";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";
import { acceptedRequestController, connectRequestController, rejectedRequestController } from "../controllers/connectRequestController.js";
const connectRequestRoute = express.Router();

connectRequestRoute.put("/save-connect-request",jwtVerifyMiddleware,connectRequestController);
connectRequestRoute.put("/accept-request",jwtVerifyMiddleware,acceptedRequestController);
connectRequestRoute.put("/reject-request",jwtVerifyMiddleware,rejectedRequestController);
export default connectRequestRoute;