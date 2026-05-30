import express from "express";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";
import { addCommentController, getCommentsController, updateCommentsController } from "../controllers/commentController.js";

const commentRoute = express.Router();

commentRoute.post("/api/add-comment",jwtVerifyMiddleware,addCommentController);
commentRoute.get("/api/get-comments/:post_id",jwtVerifyMiddleware,getCommentsController);
commentRoute.put("/api/update-comment",jwtVerifyMiddleware,updateCommentsController);
export default commentRoute;