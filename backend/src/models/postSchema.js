import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
       type:String,
       trim:true
    },
    content:{
       type:String,
       trim:true
    },
    image_urls:[{
       type:String,
       trim:true 
    }],
    post_type:{
       type:String,
       trim:true 
    },
    likes_count:[{
       type:String,
       trim:true 
    }],
    createdAt:{
       type: String,
       trim:true,
       default:new Date()
    },
    updatedAt:{
       type:String,
       trim:true,
       default:new Date()  
    }
});

const postModel = mongoose.model("Posts",postSchema);

export default postModel;