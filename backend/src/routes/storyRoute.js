import express from "express";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";
import { createStoryController } from "../controllers/storyController.js";
import { getStoryDataController } from "../controllers/storyController.js";
import { getStoryController } from "../controllers/storyController.js";
import upload from "../config/multerConfig.js";

const storyRoute = express.Router();

storyRoute.post("/api/create-story",jwtVerifyMiddleware,upload.single("media_url"),createStoryController);
storyRoute.get("/api/get-story-data",jwtVerifyMiddleware,getStoryDataController);
storyRoute.post("/api/get-story",jwtVerifyMiddleware,getStoryController);

export default storyRoute;