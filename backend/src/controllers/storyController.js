import imageKit from "../config/imageKitConfig.js";
import fs from "fs";
import { storyModel } from "../models/storySchema.js";
import userModel from "../models/userSchema.js";

export async function createStoryController(req, resp) {
  try {
    let data = req.body;
    const mediaFile = req.file;
    if (mediaFile) {
      const response = await imageKit.files.upload({
        file: fs.createReadStream(mediaFile.path),
        fileName: mediaFile.originalname,
      });
      data.media_url = response.url;
      fs.unlink(mediaFile.path, (error) => {
        if (error) console.log(error);
      });
    }
    const result = await storyModel.create(data);
    if (result) {
      const userInfo = await userModel.findOne({ email: data.user });
      if (userInfo) {
        const storiesArr = userInfo.stories;
        storiesArr.push(result._id);
        const result2 = await userModel.updateOne(
          { email: data.user },
          { $set: { stories: storiesArr } },
        );
        if (!result2) {
          return;
        }
        resp
          .status(200)
          .send({ message: "Story Stored in Database", success: true, result });
        return;
      } else {
        return;
      }
    }
    resp
      .status(500)
      .send({ message: "Story Not Stored in Database", success: false });
    return;
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}

export async function getStoryDataController(req, resp) {
  try {
    const result = await storyModel.find();
    if (result) {
      resp
        .status(200)
        .send({ message: "Data Fetched From Database", success: true, result });
      return;
    }
    resp
      .status(500)
      .send({ message: "Data Not Fetched From Database", success: false });
    return;
  } catch (error) {
    resp
      .status(500)
      .send({ message: error.message , success: false });
    return;
  }
}

export async function getStoryController(req,resp){
   try{
      const{ _id } = req.body;
      const result = await storyModel.findOne({_id});
      if(result){
         resp.status(200).send({message:"Data Fetched from Database",success:true,result});
         return;
      }
      resp.status(500).send({message:"Data Not Fetched from Database" , success:false});
      return;
   }catch(error){
      resp.status(500).send({message:error.message , success:false});
      return;
   } 
}
