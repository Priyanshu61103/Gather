import express from "express";
import { getPostContoller, getPostsController, updateLikesController } from "../controllers/postController.js";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";
import { createPostController } from "../controllers/postController.js";
import upload from "../config/multerConfig.js";

const postRoute = express.Router();

postRoute.get("/api/get-posts-data",jwtVerifyMiddleware,getPostsController);
postRoute.post("/api/create-post",jwtVerifyMiddleware,upload.array("image_urls"),createPostController);
postRoute.put("/api/update-likes",jwtVerifyMiddleware,updateLikesController);
postRoute.get("/api/get-post/:id",jwtVerifyMiddleware,getPostContoller);
export default postRoute;