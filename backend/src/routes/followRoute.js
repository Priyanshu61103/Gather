import express from "express"
import { updateFollowersController, updateFollowingController } from "../controllers/followController.js";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";

const followRoute = express.Router();

followRoute.put("/api/update-following",jwtVerifyMiddleware,updateFollowingController);
followRoute.put("/api/update-follower",jwtVerifyMiddleware,updateFollowersController);
export default followRoute;