import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

export async function dbConnection(){
    try{
       await mongoose.connect(url);
       console.log("..... Connected to Database .....");
    }catch(error){
        console.log("Not Connected to Database",error.message);
    }
} 