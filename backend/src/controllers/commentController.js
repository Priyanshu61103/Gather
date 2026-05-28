import commentModel from "../models/commentSchema.js";

export async function addCommentController(req, resp) {
  try {
    const info = req.body;
    const result = await commentModel.create(info);
    if (result) {
      resp
        .status(200)
        .send({ message: "Comment Added in Database", success: true });
      return;
    }
    resp
      .status(500)
      .send({ message: "Comment Not Added in Database", success: false });
    return;
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}

export async function getCommentsController(req, resp) {
  try {
    const { post_id } = req.params;
    console.log(post_id);
    const result = await commentModel.find({ post_id });
    if (result) {
      resp.status(200).send({
        message: "Comments Data Fetched from Database",
        success: true,
        result,
      });
      return;
    }
    resp.status(500).send({
      message: "Comments Data Not Fetched from Database",
      success: false,
    });
    return;
  } catch (error) {
    resp.status(500).send({
      message: "Comments Data Not Fetched from Database",
      success: false,
    });
    return;
    resp.status(500).send({
      message: error.message,
      success: false,
    });
    return;
  }
}

export async function updateCommentsController(req, resp) {
  try {
    const data = req.body;
    const result = await commentModel.updateOne(
      { _id: data._id },
      {
        $set: {
          likes_count: data.likes_count,
          dislikes_count: data.dislikes_count,
        },
      },
    );
    if (result.modifiedCount > 0) {
      resp.status(200).send({ message: "Comment Data Updated", success: true });
      return;
    }
    resp
      .status(500)
      .send({ message: "Comment Data Not Updated", success: false });
    return;
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}
