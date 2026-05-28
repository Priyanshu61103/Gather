import express from "express";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";
import { getMessagesController, postMessageController } from "../controllers/messageController.js";
import upload from "../config/multerConfig.js";

const messageRoute = express.Router();

messageRoute.post("/post-message",jwtVerifyMiddleware,upload.single("message_image"),postMessageController);
messageRoute.post("/get-messages",jwtVerifyMiddleware,getMessagesController);
export default messageRoute;