import express from 'express';
import fetchUser from '../middleware/fetchUser';
import walletController from '../controllers/walletcontroller';

const router=express.Router();

router.get('/info',fetchUser,walletController.info);

export default router;