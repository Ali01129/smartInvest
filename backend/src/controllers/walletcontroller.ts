import express, { Request, Response } from 'express';
import Wallet from '../models/wallet';

interface AuthenticatedRequest extends Request {
    user?: any;
}

class walletController{
    public async info(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const user = req.user;
        try {
            const wallet = await Wallet.findOne({ userId: user.id });
            if (!wallet) {
                return res.status(404).send({ status: 'error', message: 'Wallet not found' });
            }
            return res.status(200).send({ status: 'success', wallet });
        } catch (error) {
            console.error('Error fetching wallet info:', error);
            return res.status(500).send({ status: 'error', message: 'Internal server error' });
        }
    }    
}
export default new walletController();