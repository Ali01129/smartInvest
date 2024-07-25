import express, { Request, Response } from 'express';
import UserController from '../controllers/authController';

const router = express.Router();

// Signup route
router.post('/signup', UserController.signup);
// Login route
router.post('/login', UserController.login);
// Forget password route
router.post('/forget-password', UserController.forgetPassword);

export default router;
