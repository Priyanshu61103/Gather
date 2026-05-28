import otpModel from "../models/otpSchema.js";
import bcrypt from "bcrypt";
export async function otpVerifyMiddleware(req, resp, next) {
  try {
    const { email } = req.body;
    const { otp } = req.body;
    const result = await otpModel.findOne({ email: email });
    if (result) {
      const verifier = await bcrypt.compare(otp, result.otp);
      if (verifier) {
        next();
      } else {
        resp.status(500).send({ message: "Otp Didn't Match", success: false });
        return;
      }
    }else {
        resp.status(500).send({ message: "Otp Didn't Match", success: false });
        return;
      }
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}
