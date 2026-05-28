import otpModel from "../models/otpSchema.js";
import { transport } from "../utils/nodemailer.js";
import bcrypt from "bcrypt";

export async function otpController(req, resp, next) {
  try {
    const userData = req.body;
    const email = req.body.email;
    const otp = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, 0);  
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    const data = {
      email,
      otp: hashedOtp,
    };
    const result = await otpModel.create(data);
    if (result) {
      const mailOptions = {
        from: "Gather",
        to: email,
        subject: "OTP Verification",
        text: `Hello user , your otp for verification is ${otp}`,
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          resp
            .status(500)
            .send({ message: "Operation Failed", success: false });
          return;
        }
        resp.status(200).send({ message: "Mail Sent", success: true });
        return;
      });
    } else {
      resp.status(500).send({ message: "Operation Failed", success: false });
    }
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
  }
}
