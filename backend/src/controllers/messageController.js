import imageKit from "../config/imageKitConfig.js";
import messageModel from "../models/messageSchema.js";
import fs from "fs";

export async function postMessageController(req, resp) {
  const IMAGEKIT_URL_ENDPOINT = process.env.IMAGEKIT_URL_ENDPOINT;
  try {
    const data = req.body;
    const img = req.file;
    if (data.media_type == "image") {
      const stream = fs.createReadStream(img.path);
      const response = await imageKit.upload({
        file: stream,
        fileName: img.originalname,
      });

      const url = imageKit.helper.buildSrc({
        urlEndpoint: IMAGEKIT_URL_ENDPOINT,
        src: response.filePath,
        transformation: [
          {
            height: "auto",
            width: "auto",
            quality: "auto",
          },
        ],
      });
      data["media_url"] = url;
      await fs.unlink(img.path);
    }
    const result = await messageModel.create(data);
    if (result) {
      resp.status(200).send({
        message: "Message Posted Successfully",
        success: true,
        result,
      });
      return;
    }
    resp.status(500).send({ message: "Message Not Posted", success: false });
    return;
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}

export async function getMessagesController(req, resp) {
  try {
    const { email_1 } = req.body;
    const { email_2 } = req.body;
    const result = await messageModel.updateMany(
      { from_user_email: email_2, to_user_email: email_1 },
      { $set: { seen: true } },
    );
    if (result) {
      const result2 = await messageModel.find({
        $or: [
          { from_user_email: email_1, to_user_email: email_2 },
          { from_user_email: email_2, to_user_email: email_1 },
        ],
      });
      if (result2) {
        resp.status(200).send({
          message: "Messages Data Fetched from Database",
          success: true,
          result2,
        });
        return;
      }
      resp.status(500).send({
        message: "Messages Data Not Fetched from Database",
        success: false,
      });
      return;
    }
    resp.status(500).send({
      message: "Messages Data Not Updated and Fetched from Database",
      success: false,
    });
    return;
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}
