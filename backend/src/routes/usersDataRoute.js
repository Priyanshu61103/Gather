import express from "express";
import { usersDataController } from "../controllers/usersDataController.js";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";

const usersDataRoute = express.Router();

usersDataRoute.get("/api/users-data",jwtVerifyMiddleware,usersDataController);

export default usersDataRoute;