import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

interface AuthenticatedRequest extends Request {
  user?: any;
}

const fetchUser = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('auth-token');

  if (token) {
    try {
      const compare = jwt.verify(token, JWT_SECRET);
      req.user = compare;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Invalid token. Please log in again.' });
    }
  } else {
    res.status(401).send({ error: 'Login first to use this functionality.' });
  }
};

export default fetchUser;
