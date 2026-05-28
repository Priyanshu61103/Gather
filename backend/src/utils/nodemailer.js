import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_KEY,
  },
  tls: {
    rejectUnauthorized: false, // Prevents local/production certificate issues
    minVersion: "TLSv1.2", // Forces a modern, secure TLS handshake
  },
});
