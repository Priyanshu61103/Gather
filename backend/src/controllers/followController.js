import userModel from "../models/userSchema.js";

export async function updateFollowingController(req, resp) {
  try {
    const { email } = req.body;
    const { following } = req.body;
    const result = await userModel.updateOne(
      { email: email },
      { $set: { following } },
    );
    if (result.modifiedCount > 0) {
      resp.status(200).send({
        message: "Following Data Updated in Database",
        success: true,
        result,
      });
      return;
    }
    resp
      .status(500)
      .send({ message: "Following Data Not Updated in Database", success: false });
    return;
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}

export async function updateFollowersController(req, resp) {
  try {
    const { email } = req.body;
    const { followerEmail } = req.body;
    const result = await userModel.updateOne(
      { email: email },
      { $addToSet: { followers: followerEmail } },
    );
    if (result.modifiedCount > 0) {
      resp.status(200).send({
        message: "Followers Data Updated in Database",
        success: true,
        result,
      });
      return;
    } else {
      resp.status(500).send({
        message: "Followers Data Not Updated in Database",
        success: false,
      });
      return;
    }
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}
