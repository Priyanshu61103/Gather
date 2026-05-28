import express from "express";
import { profileController } from "../controllers/profileController.js";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";
import { editProfileController } from "../controllers/profileController.js";
import upload from "../config/multerConfig.js";

const profileRoute = express.Router();

profileRoute.post("/profile",profileController);
profileRoute.post("/profile/update-data",jwtVerifyMiddleware,upload.fields([{name:"profile_picture"},{name:"cover_photo"}]),editProfileController);

export default profileRoute
