import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user';

import dotenv from 'dotenv';
import Wallet from '../../models/wallet';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { username, password, email, referralCode, phantomWalletAddress } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send({ status: 'error', message: 'User already exists' });
    }
    const salt=await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: encryptedPassword,
      email,
      phantomWalletAddress,
      referralCode: referralCode || undefined
    });

    const wallet=await Wallet.create({
      userId:user._id,
      usd:0,
      smartCoin:0
    });

    res.status(201).send({ status: 'success', message: 'User created successfully', data: user,wallet:wallet });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Internal server error', data: error });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (isPasswordValid) {
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ status: "sucess",messgae:"Login Sucessfull", token });
      } else {
        return res.status(400).json({ error: 'Incorrect email or password.' });
      }
    } else {
      return res.status(400).json({ error: 'Incorrect email or password.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;