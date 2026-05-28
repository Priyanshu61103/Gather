import { response } from "express";
import userModel from "../models/userSchema.js";

export async function usersDataController(req,resp){
   try{
      const result = await userModel.find();
      if(result){
         resp.status(200).send({message:"Users Data Fetched From Database",success:true,result});
         return;
      }
      else{
         resp.status(500).send({message:"Users Data Not Fetched From Database" , success : false});
         return;
      }
   }catch(error){
       console.log(error.message);
       resp.status(500).send({message:error.message,success:false});    
       return;
   } 
}