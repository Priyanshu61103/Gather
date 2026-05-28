import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from_user_email: {
    type: String,
    required: true,
  },
  to_user_email: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
  media_type: {
    type: String,
    default: "text",
  },
  media_url: {
    type: String,
    default: "",
  },
  createdAt:{
     type:Date,
     default:Date.now
  },
  updatedAt:{
     type:Date,
     default:Date.now
  },
  seen:{
     type:Boolean,
     default:false
  }
});


const messageModel = mongoose.model("Messages",messageSchema);

export default messageModel;