import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./src/config/dbconfig.js";
import profileRoute from "./src/routes/profileRoute.js";
import postRoute from "./src/routes/postRoute.js";
import otpRoute from "./src/routes/otpRoute.js";
import usersDataRoute from "./src/routes/usersDataRoute.js";
import authRoute from "./src/routes/authRoute.js";
import storyRoute from "./src/routes/storyRoute.js";
import followRoute from "./src/routes/followRoute.js";
import connectRequestRoute from "./src/routes/connectRequestRoute.js";
import messageRoute from "./src/routes/messageRoute.js";
import commentRoute from "./src/routes/commentRoute.js";

const PORT = process.env.PORT || 3200;
const app = express();

app.use(cors({
    origin:["http://localhost:5173",process.env.FRONTEND_URL],
    credentials:true
}));

app.use(cookieParser());

app.use(express.json());
app.use(profileRoute);
app.use(postRoute);
app.use(usersDataRoute);
app.use(otpRoute);
app.use(authRoute);
app.use(storyRoute);
app.use(followRoute);
app.use(connectRequestRoute);
app.use(messageRoute);
app.use(commentRoute);

dbConnection();

app.listen(PORT,()=>{
    console.log("Server running on Port ",PORT);
});
