import userModel from "../models/userSchema.js";
import fs from "fs";
import imageKit from "../config/imageKitConfig.js";
import path from "path";

export async function profileController(req, resp) {
  try {
    const { email } = req.body;
    const result = await userModel.find({ email });
    if (result) {
      resp
        .status(200)
        .send({
          message: "Profile Data Fetched from Database",
          success: true,
          result,
        });
    } else {
      resp
        .status(404)
        .send({
          message: "Profile Data is Not Fetched from Database",
          success: false,
        });
    }
  } catch (error) {
    resp
      .status(404)
      .send({ message: `Error : ${error.message}`, success: false });
  }
}

export async function editProfileController(req, resp) {
  try {
    const data = req.body;
    const files = req.files;
    const updatedData = {
      bio: data.bio,
      location: data.location,
      username: data.username,
      full_name: data.full_name,
      updatedAt: new Date(),
    };
     if (files && files["profile_picture"]) {
      const profileFile = files["profile_picture"];
      const profileResponse = await imageKit.upload({
        file: profileFile.buffer,
        fileName: files["profile_picture"].originalname,
      });
      const url = imageKit.url({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        path: profileResponse.filePath,
        transformation: [{ quality: "auto", format: "webp", width: "512" }],
      });
      updatedData.profile_picture = url;
    }

    if (files && files["cover_photo"]) {
      const coverPhotoFile = files["cover_photo"];
      const coverPhotoResponse = await imageKit.upload({
        file: coverPhotoFile.buffer,
        fileName: files["cover_photo"].originalname,
      });
      const url = imageKit.url({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        path: coverPhotoResponse.filePath,
        transformation: [{ quality: "auto", format: "webp", width: "1280" }],
      });
      updatedData.cover_photo = url;
    }

    const coverPhotoFile = files["cover_photo"];
    const coverPhotoResponse = await imageKit.upload({
      file: coverPhotoFile.buffer,
      fileName: files["cover_photo"].originalname,
    });
    const url = imageKit.url({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      path: coverPhotoResponse.filePath,
      transformation: [{ quality: "auto", format: "webp", width: "1280" }],
    });
    updatedData.cover_photo = url;

    const result = await userModel.updateMany(
      { _id: data._id },
      { $set: updatedData },
    );
    if (result) {
      resp
        .status(200)
        .send({ message: "Profile Updated", success: true, result });
      return;
    } else {
      resp.status(500).send({ message: "Profile Not Updated", success: false });
      return;
    }
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}
