import imageKit from "../config/imageKitConfig.js";
import postModel from "../models/postSchema.js";
import fs from "fs";
import userModel from "../models/userSchema.js";

export async function createPostController(req, resp) {
  try {
    const data = req.body;
    const files = req.files;
    const image_urls = [];
    if (!data.image_urls) {
      const stream = fs.createReadStream(files[0].path);
      const response = await imageKit.files.upload({
        file: stream,
        fileName: files[0].originalname,
      });
      const url = imageKit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: response.filePath,
        transformation: [
          {
            format: "webp",
            quality: "auto",
          },
        ],
      });

      image_urls.push(url);
      data.image_urls = image_urls;
      await fs.unlink(files[0].path);
    }
    const result = await postModel.create(data);
    if (result) {
      const userInfo = await userModel.findOne({ email: data.user });
      let postArray = userInfo.posts;
      postArray.push(result._id);
      const result2 = await userModel.updateOne(
        { _id: userInfo._id },
        { $set: { posts: postArray } },
      );
      if (!result2) {
        return;
      }
      resp.status(200).send({ message: "Posted", success: true, result });
      return;
    } else {
      resp.status(500).send({ message: "Not Posted", success: false });
      return;
    }
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}

export async function getPostsController(req, resp) {
  try {
    const result = await postModel.find();
    if (result) {
      resp
        .status(200)
        .send({
          message: "Posts Data is Fetched from Database",
          success: true,
          result,
        });
      return;
    } else {
      resp
        .status(500)
        .send({
          message: "Posts Data is Not Fetched from Database",
          success: false,
        });
      return;
    }
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}

export async function updateLikesController(req, resp) {
  try {
    const { id } = req.body;
    const { likes } = req.body;
    const result = await postModel.updateOne(
      { _id: id },
      { $set: { likes_count: likes } },
    );
    if (result) {
      resp.status(200).send({ message: "Likes Updated", success: true });
      return;
    }
    resp.status(500).send({ message: "Likes Not Updated", success: false });
    return;
  } catch (error) {
    resp.status(500).send({ message: error.message , success: false });
    return;
  }
}


export async function getPostContoller(req,resp){
   try{
      const { id } = req.params;
      const result = await postModel.findOne({_id:id});
      if(result){
         resp.status(200).send({message:"Post Fetched From Database",success:true,result});
         return;  
      }
       resp.status(500).send({message:"Post Not Fetched From Database",success:false});
       return;  
   }catch(error){
       resp.status(500).send({message:error.message,success:false});
       return;   
   }
}