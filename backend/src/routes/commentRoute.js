import express from "express";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";
import { addCommentController, getCommentsController, updateCommentsController } from "../controllers/commentController.js";

const commentRoute = express.Router();

commentRoute.post("/add-comment",jwtVerifyMiddleware,addCommentController);
commentRoute.get("/get-comments/:post_id",jwtVerifyMiddleware,getCommentsController);
commentRoute.put("/update-comment",jwtVerifyMiddleware,updateCommentsController);
export default commentRoute;