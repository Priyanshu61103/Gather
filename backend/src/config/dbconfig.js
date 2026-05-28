import mongoose from "mongoose";

const dbName = "gather";
const url = `mongodb+srv://priyanshuparashar108:${process.env.MONGODB_PASSWORD}@cluster0.rkiizre.mongodb.net/${dbName}?appName=Cluster0`;

export async function dbConnection(){
    try{
       await mongoose.connect(url);
       console.log("..... Connected to Database .....");
    }catch(error){
        console.log("Not Connected to Database",error.message);
    }
} 