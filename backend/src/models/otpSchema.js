import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
   email:{
      type:String,
      trim:true,
      required:true
   },
   otp:{
      type:String,
      trim:true
   },
   createdAt:{
       type:Date,
       default: Date.now,
       expires:300
   }
});

const otpModel = mongoose.model("Otpstorages",otpSchema);

export default otpModel;