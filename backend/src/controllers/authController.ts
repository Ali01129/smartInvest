import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import Wallet from '../models/wallet';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: 'ijustsentyouamail@gmail.com',
    pass: 'daccgpbliqpeurik',
  },
});


class UserController {

    // signup method
    // post Request /auth/signup
    // getting username , password , email , referralCode , phantomWalletAddress from user

  public async signup(req: Request, res: Response): Promise<Response> {
    const { username, password, email, referralCode, phantomWalletAddress } = req.body;

    try {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).json({ status: 'error', message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        username,
        password: encryptedPassword,
        email,
        phantomWalletAddress,
        referralCode: referralCode || undefined
      });

      const wallet = await Wallet.create({
        userId: user._id,
        usd: 0,
        smartCoin: 0
      });

      return res.status(201).json({ status: 'success', message: 'User created successfully', data: user, wallet });
    } catch (error) {
      console.error('Signup Error:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error', data: error });
    }
  }

    // Login method
    // post Request /auth/login
    // getting username , password from user

  public async login(req: Request, res: Response) : Promise<Response> {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (isPasswordValid) {
          const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
          return res.json({ status: "sucess",messgae:"Login Sucessfull", token,user:user });
        } else {
          return res.status(400).json({ error: 'Incorrect email or password.' });
        }
      } else {
        return res.status(400).json({ error: 'Incorrect email or password.' });
      }
    } catch (error) {
      console.error('Login Error:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  // forgetPassword method
  // post Request /auth/forgetPassword
  // getting email from user
  public async forgetPassword(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ status: 'error', message: 'User not found.' });
      }

      const otpCode = Math.floor(100000 + Math.random() * 900000);

      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please use the following OTP to reset your password: ${otpCode}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);

      user.otpCode = otpCode.toString(); // Assuming you have an otpCode field in your User model
      await user.save();

      return res.status(200).json({ status: 'success', message: 'Password reset OTP has been sent to your email.' });
    } catch (error) {
      console.error('Forget Password Error:', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
  }
}

export default new UserController();
