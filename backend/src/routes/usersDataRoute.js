import express from "express";
import { usersDataController } from "../controllers/usersDataController.js";
import { jwtVerifyMiddleware } from "../middlewares/jwtVerifyMiddleware.js";

const usersDataRoute = express.Router();

usersDataRoute.get("/users-data",jwtVerifyMiddleware,usersDataController);

export default usersDataRoute;