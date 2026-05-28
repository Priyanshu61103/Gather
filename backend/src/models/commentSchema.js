import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
   post_id:{
      type:String,
      required:true
   }, 
   from_user_email:{
      type:String,
      required:true,
   }, 
   text:{
      type:String,
      required:true,
      default:""
   }, 
   likes_count:[{
      type:String
   }],
   dislikes_count:[{
      type:String
   }],
   createdAt:{
      type:Date,
      default:Date.now
   },
   updatedAt:{
      type:Date,
      default:Date.now
   },
});

const commentModel = mongoose.model("Comments",commentSchema);

export default commentModel;