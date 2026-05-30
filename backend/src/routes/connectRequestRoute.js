import express from "express";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";
import { acceptedRequestController, connectRequestController, rejectedRequestController } from "../controllers/connectRequestController.js";
const connectRequestRoute = express.Router();

connectRequestRoute.put("/api/save-connect-request",jwtVerifyMiddleware,connectRequestController);
connectRequestRoute.put("/api/accept-request",jwtVerifyMiddleware,acceptedRequestController);
connectRequestRoute.put("/api/reject-request",jwtVerifyMiddleware,rejectedRequestController);
export default connectRequestRoute;