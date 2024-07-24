import express, { Request, Response, NextFunction } from 'express';
import fetchUser from '../../middleware/fetchUser';
import Wallet from '../../models/wallet';
import Transaction from '../../models/transaction';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const CONVERSION_RATE = 5; 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface AuthenticatedRequest extends Request {
  user?: any;
}

const router = express.Router();

router.put('/send', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    const { address, amount } = req.body;
    const user = req.user;
  
    try {
      const senderWallet = await Wallet.findOne({ userId: user.id });
      const receiverWallet = await Wallet.findOne({ _id: address });
      if (!senderWallet || !receiverWallet) {
        return res.status(404).send({ status: 'error', message: 'Wallet not found'});
      }
  
      if (senderWallet.smartCoin < amount) {
        return res.status(400).send({ status: 'error', message: 'Insufficient balance',senderWallet,receiverWallet,user });
      }
  
      senderWallet.smartCoin -= amount;
      receiverWallet.smartCoin += amount;
  
      await senderWallet.save();
      await receiverWallet.save();
      
      const transaction=await Transaction.create({
        senderId:senderWallet.userId,
        receiverId:receiverWallet.userId,
        amount:amount
      });

      return res.status(200).send({status: 'success',message: 'Transaction successful',transaction:transaction});
    } catch (error) {
      console.error('Transaction error:', error);
      return res.status(500).send({ status: 'error', message: 'Internal server error' });
    }
});

router.put('/deposit', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
  const { amount, paymentMethodId } = req.body;
  const user = req.user;
  try {
      const wallet = await Wallet.findOne({ userId: user.id });
      if (!wallet) {
          return res.status(404).send({ status: 'error', message: 'Wallet not found' });
      }

      const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100,
          currency: 'usd',
          payment_method: paymentMethodId,
          confirm: true,
      });
      
      if (paymentIntent.status === 'succeeded') {
          wallet.usd += amount;
          await wallet.save();
          const transaction = await Transaction.create({
              senderId: wallet.userId,
              receiverId: 'Stripe',
              amount: amount,
          });
          return res.status(200).send({ status: 'success', message: 'Deposit successful', wallet, transaction });
      } else {
          return res.status(400).send({ status: 'error', message: 'Payment failed' });
      }
  } catch (error) {
      console.error('Deposit error:', error);
      return res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});


router.post('/convert', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
  const { amount, DtoSc } = req.body;
  const user = req.user;

  try {
      const wallet = await Wallet.findOne({ userId: user.id });
      if (!wallet) {
          return res.status(404).send({ status: 'error', message: 'Wallet not found' });
      }

      if (DtoSc) { // USD to smartCoin conversion
          if (wallet.usd < amount) {
              return res.status(400).send({ status: 'error', message: 'Insufficient balance' });
          }
          const smartCoinAmount = amount * CONVERSION_RATE;
          wallet.usd -= amount;
          wallet.smartCoin += smartCoinAmount;

          await wallet.save();
          const transaction = await Transaction.create({
              senderId: 'Conversion from USD',
              receiverId: wallet.userId,
              amount: smartCoinAmount,
          });
          return res.status(200).send({ status: 'success', message: 'Conversion successful', wallet, transaction });

      } else { // smartCoin to USD conversion
          const usdAmount = amount / CONVERSION_RATE;
          if (wallet.smartCoin < amount) {
              return res.status(400).send({ status: 'error', message: 'Insufficient balance' });
          }
          wallet.smartCoin -= amount;
          wallet.usd += usdAmount;

          await wallet.save();
          const transaction = await Transaction.create({
              senderId: wallet.userId,
              receiverId: 'Conversion from smartCoin',
              amount: usdAmount,
          });
          return res.status(200).send({ status: 'success', message: 'Conversion successful', wallet, transaction });
      }
  } catch (error) {
      console.error('Conversion error:', error);
      return res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});


export default router;