import nodemailer from 'nodemailer';
import Otp from '../models/otp.js';
import crypto from 'crypto';

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const plainOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(plainOtp).digest("hex");

    await Otp.create({ email, otp: plainOtp });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Registration",
      text: `Your OTP is ${plainOtp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};
