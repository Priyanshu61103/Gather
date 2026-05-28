import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    user:{
       type:String,
       trim:true
    },
    content:{
        type:String,
        default:""
    },
    media_url:{
        type:String,
        default:""
    },
    media_type:{
        type:String,
        default:"text"
    },
    background_color:{
       type:String,
       default:"" 
    },
    createdAt:{
        type:String,
        default:new Date()
    },
    updatedAt:{
        type:String,
        default:new Date()
    }
});

export const storyModel = mongoose.model("Stories",storySchema);

