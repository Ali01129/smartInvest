import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  const { username, password, email, referralCode, phantomWalletAddress } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send({ status: 'error', message: 'User already exists' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: encryptedPassword,
      email,
      phantomWalletAddress,
      referralCode: referralCode || undefined
    });

    res.status(201).send({ status: 'success', message: 'User created successfully', data: user });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Internal server error', data: error });
  }
});

export default router;