import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import otpModel from "../models/otpSchema.js";
import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function checkPassword(password1, password2) {
  const result = await bcrypt.compare(password1, password2);
  return result;
}

export async function authSignUpController(req, resp) {
  try {
    const data = req.userDetails;
    const email = data.email;

    const result1 = await userModel.findOne({ email });
    if (result1) {
      if (result1.authProvider == "google") {
        resp.status(401).send({
          message: "Account Already Exists. Please Login with Google",
          success: false,
        });
        return;
      }

      if (result1.authProvider == "local") {
        resp.status(401).send({
          message: "Account Already Exists.Please Login locally",
          success: false,
        });
        return;
      }
    }
    const password = data.password;
    data.username = email.split("@")[0];
    data.full_name = email.split("@")[0];
    const result = await userModel.create(data);
    if (result) {
      const payload = {
        _id: result._id,
        email: result.email,
        username: result.username,
        full_name: result.full_name,
      };
      const result2 = await otpModel.deleteMany({ email: email });
      jwt.sign(
        payload,
        JWT_SECRET_KEY,
        { expiresIn: "10d" },
        (error, token) => {
          if (error) {
            resp.status(500).send({ message: error.message, success: false });
            return;
          }
          resp.status(200).send({
            message: "Data Saved in Database",
            success: true,
            payload,
            token,
          });
        },
      );
    } else
      resp
        .status(500)
        .send({ message: "Data Not Saved in Database", success: false });
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
  }
}

export async function authLoginController(req, resp) {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const result = await userModel.findOne({ email });
    if (result) {
      if (result.authProvider == "google") {
        resp
          .status(401)
          .send({ message: "Please try to Login with Google", success: false });
        return;
      }

      if (await checkPassword(password, result.password)) {
        const payload = {
          _id: result._id,
          username: result.username,
          email: result.email,
          full_name: result.full_name,
        };
        jwt.sign(
          payload,
          JWT_SECRET_KEY,
          { expiresIn: "10d" },
          (error, token) => {
            if (error) {
              resp.status(500).send({
                message: `JWT Error ${error.message}`,
                success: false,
              });
              return;
            }
            resp.cookie("token", token, {
              httpOnly: true, 
              secure: true,
              sameSite: "none",
              maxAge: 24 * 60 * 60 * 1000,
            });
            resp.status(200).send({
              message: "Data Found in Database",
              success: true,
              payload,
            });
          },
        );
      } else {
        resp.status(500).send({ message: "Invalid Password", success: false });
        return;
      }
    } else {
      resp
        .status(500)
        .send({ message: "Data Not Present in Database", success: false });
      return;
    }
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}

export async function authGoogleController(req, resp) {
  try {
    const { googleToken } = req.body;
    const data = await client.verifyIdToken({
      idToken: googleToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const email = data.payload.email;
    const result = await userModel.findOne({ email });
    if (result) {
      const payload = {
        _id: result._id,
        email: result.email,
        username: result.username,
        full_name: result.full_name,
      };
      const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "10d" });
      resp.status(200).send({
        message: "Data Found in Database",
        success: true,
        payload,
        token,
      });
      return;
    }
    const username = email.split("@")[0];
    const full_name = email.split("@")[0];
    const info = { email, username, full_name, authProvider: "google" };
    const result2 = await userModel.create(info);
    if (result2) {
      const payload = {
        _id: result2._id,
        email: result2.email,
        username: result2.username,
        full_name: result.full_name,
      };
      const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "10d" });
      resp.cookie("token", token, {
        httpOnly: true, 
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      resp.status(200).send({
        message: "Data Stored in Database",
        success: true,
        payload,
      });
      return;
    } else {
      resp
        .status(500)
        .send({ message: "Data Not Stored in Database", success: false });
      return;
    }
  } catch (error) {
    resp.status(500).send({ message: error.message, success: false });
    return;
  }
}
