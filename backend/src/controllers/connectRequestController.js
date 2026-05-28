import userModel from "../models/userSchema.js";
import { transport } from "../utils/nodemailer.js";

export async function connectRequestController(req, resp) {
  try {
    const { senderEmail } = req.body;
    const { receiverEmail } = req.body;
    const updateSenderResult = await userModel.updateOne(
      { email: senderEmail },
      { $addToSet: { sentRequest: receiverEmail } },
    );
    if (
      updateSenderResult.modifiedCount == 0 &&
      updateSenderResult.matchedCount == 0
    ) {
      resp.status(500).send({ message: "Data Not Updated", success: false });
      return;
    }

    const updateReceiverResult = await userModel.updateOne(
      { email: receiverEmail },
      { $addToSet: { receiveRequest: senderEmail } },
    );
    if (
      updateReceiverResult.modifiedCount == 0 &&
      updateReceiverResult.matchedCount == 0
    ) {
      resp.status(500).send({ message: "Data Not Updated", success: false });
      return;
    }

    resp.status(200).send({
      message: "Data Updated For Both Sender and Receiver in Database.",
      success: true,
    });
    return;
  } catch (error) {
    console.log(error.message);
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}

export const acceptedRequestController = async (req, resp) => {
  try {
    const { sender } = req.body;
    const { receiver } = req.body;
    console.log(sender);
    console.log(receiver);
    const result = await userModel.updateMany(
      { email: receiver },
      { $addToSet: { connections: sender }, $pull: { receiveRequest: sender } },
    );
    if (result.modifiedCount <= 0) {
      resp.status(500).send({ message: "Request Declined", success: false });
      return;
    }

    const result2 = await userModel.updateMany(
      { email: sender },
      {
        $addToSet: { connections: receiver },
        $pull: { sentRequest: receiver },
      },
    );

    if (result2.modifiedCount <= 0) {
      resp.status(500).send({ message: "Request Declined", success: false });
      return;
    }

    const mailOptions = {
      from: "Gather",
      to: sender,
      subject: "Connection Request Accepted",
      text: `Yayy ! Your Connection request has been accepted by ${receiver}.`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        resp.status(500).send({ message: "Operation Failed", success: false });
      }
      resp
        .status(200)
        .send({ message: "Request Accepted", success: true, result });
      return;
    });
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
};

export const rejectedRequestController = async (req, resp) => {
  try {
    const { sender } = req.body;
    const { receiver } = req.body;
    const result = await userModel.updateMany(
      { email: receiver },
      { $pull: { receiveRequest: sender } },
    );
    if (result.modifiedCount <= 0) {
      resp
        .status(500)
        .send({ message: "Request Not Rejected", success: false });
      return;
    }

    const result2 = await userModel.updateMany(
      { email: sender },
      {
        $pull: { sentRequest: receiver },
      },
    );

    if (result2.modifiedCount <= 0) {
      resp
        .status(500)
        .send({ message: "Request Not Rejected", success: false });
      return;
    }

    resp
      .status(200)
      .send({ message: "Request Rejected", success: true, result });
    return;
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
};
