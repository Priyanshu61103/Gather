import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   email:{
      type:String,
      required:[true,"Email is required"],
      trim:true,
      unique:true
   },
   password:{
      type:String,
      trim:true,
   },
   full_name:{
      type:String,
      trim:true,
      default:""
   },
   username:{
      type:String,
      required:[true,"UserName is required"],
      trim:true,
      unique:true
   },
   bio:{
      type:String,
      trim:true,
      default:"Hey there! I'm using Gather."
   },
   profile_picture:{
      type:String,
      trim:true,
      default:""
   },
   cover_photo:{
      type:String,
      trim:true,
      default:""
   },
   location:{
      type:String,
      trim:true,
      default:""
   },
   // array is used because there will be lot of followers to store all of them we used array here with ref users so that user id is used from collection "users" 
   followers: [
       {type:String,
       ref:"Users"}
   ],
   following:[
       {type:String,
       ref:"Users"}
   ],
   connections:[
       {type:String,
       ref:"Users"}
   ],
   sentRequest:[
      {type:String,
         ref:"Users"
      }
   ],
   receiveRequest:[
      {type:String,
         ref:"Users"
      }
   ],
   posts:[
      {type:String,
       ref:"Users"}
   ],
   stories:[
      {type:String,
       ref:"Users"}
   ],
   isverified:{
      type:Boolean,
      trim:true,
      default:true
   },
   createdAt:{
      type:String,
      trim:true,
      default:new Date()
   },
   updatedAt:{
      type:String,
      trim:true,
      default:new Date()

   },
   authProvider:{
      type:String,
      enum:["local","google"], // only these two values will be accepted in this field
      default:"local"
   }
},{
   // will store when account is created and updated with the help of timestamp 
   timestamps:true,
   // empty things will also be stored now if we keep minimize false as mongoose default behaviour is to remove empty things 
   minimize:false 
});

const userModel = mongoose.model("Users",userSchema);

export default userModel;