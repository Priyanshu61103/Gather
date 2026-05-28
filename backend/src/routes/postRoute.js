import express from "express";
import { getPostContoller, getPostsController, updateLikesController } from "../controllers/postController.js";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";
import { createPostController } from "../controllers/postController.js";
import upload from "../config/multerConfig.js";

const postRoute = express.Router();

postRoute.get("/get-posts-data",jwtVerifyMiddleware,getPostsController);
postRoute.post("/create-post",jwtVerifyMiddleware,upload.array("image_urls"),createPostController);
postRoute.put("/update-likes",jwtVerifyMiddleware,updateLikesController);
postRoute.get("/get-post/:id",jwtVerifyMiddleware,getPostContoller);
export default postRoute;