import express, { Request, Response } from 'express';
import Wallet from '../models/wallet';
import Transaction from '../models/transaction';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import User from '../models/user';
dotenv.config();


interface AuthenticatedRequest extends Request {
    user?: any;
}

const CONVERSION_RATE = 5;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

class TransactionController {
    // send method
    // post Request /transaction/send
    // getting address and amount from user
    public async send(req: AuthenticatedRequest, res: Response) : Promise<Response> {
        const { address, amount } = req.body;
        const user = req.user;
    
        try {
          const senderWallet = await Wallet.findOne({ userId: user.id });
          const receiverWallet = await Wallet.findOne({ _id: address });
          if (!senderWallet || !receiverWallet) {
            return res
              .status(404)
              .send({ status: "error", message: "Wallet not found" });
          }
    
          if (senderWallet.smartCoin < amount) {
            return res.status(400).send({
              status: "error",
              message: "Insufficient balance",
              senderWallet,
              receiverWallet,
              user,
            });
          }
    
          senderWallet.smartCoin -= amount;
          receiverWallet.smartCoin += amount;
    
          await senderWallet.save();
          await receiverWallet.save();
    
          const sender=await User.findOne({_id:senderWallet.userId});
          const receiver=await User.findOne({_id:receiverWallet.userId});

          const transaction = await Transaction.create({
            senderId: senderWallet.userId,
            receiverId: receiverWallet.userId,
            senderName: sender?.username,
            receiverName: receiver?.username,
            amount: amount,
          });
    
          return res.status(200).send({
            status: "success",
            message: "Transaction successful",
            transaction: transaction,
          });
        } catch (error) {
          console.error("Transaction error:", error);
          return res
            .status(500)
            .send({ status: "error", message: "Internal server error" });
        }
    }

    // deposit method
    // post Request /transaction/deposit
    // getting amount from user
    public async deposit(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const { amount } = req.body;
        const user = req.user;
        try {
            const wallet = await Wallet.findOne({ userId: user.id });
            if (!wallet) {
                return res.status(404).send({ status: 'error', message: 'Wallet not found' });
            }

            wallet.usd += amount;
            await wallet.save();
            return res.status(200).send({ status: 'success', message: 'Deposit successful', wallet });
        } catch (error) {
            console.error('Deposit error:', error);
            return res.status(500).send({ status: 'error', message: 'Internal server error' });
        }
    }
    // convert method
    // post Request /transaction/convert
    // getting amount and Dollar to SmartCoin from user
    public async convert(req: AuthenticatedRequest, res: Response):Promise<Response> {
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
                return res.status(200).send({ status: 'success', message: 'Conversion successful', wallet });
      
            } else { // smartCoin to USD conversion
                const usdAmount = amount / CONVERSION_RATE;
                if (wallet.smartCoin < amount) {
                    return res.status(400).send({ status: 'error', message: 'Insufficient balance' });
                }
                wallet.smartCoin -= amount;
                wallet.usd += usdAmount;
      
                await wallet.save();
                return res.status(200).send({ status: 'success', message: 'Conversion successful', wallet });
            }
        } catch (error) {
            console.error('Conversion error:', error);
            return res.status(500).send({ status: 'error', message: 'Internal server error' });
        }
    }
    // withdraw method
    // post Request /transaction/withdraw
    // getting amount from user
    public async withdraw(req: AuthenticatedRequest, res: Response):Promise<Response> {
        const {amount}=req.body;
        const user=req.user;
        try{
          const wallet=await Wallet.findOne({userId:user.id});
          if(!wallet){
            return res.status(404).send({status:'error',message:'Wallet not found'});
          }
          if(wallet.usd<amount){
            return res.status(400).send({status:'error',message:'Insufficient balance'});
          }
          wallet.usd-=amount;
          await wallet.save();
          return res.status(200).send({status:'success',message:'Withdraw successful',wallet});
        }catch(error){
          console.error('Withdraw error:',error);
          return res.status(500).send({status:'error',message:'Internal server error'});
        }
    }

    // list method
    // post Request /transaction/list
    public async list(req: Request, res: Response):Promise<Response> {
        try {
            const transactions = await Transaction.find({});
            return res.status(200).send({ status: 'success', transactions });
        } catch (error) {
            console.error('List transactions error:', error);
            return res.status(500).send({ status: 'error', message: 'Internal server error' });
        }
    }
    // list by user id method
    // post Request /transaction/listbyid
    public async list_by_user(req: AuthenticatedRequest, res: Response): Promise<Response> {
        const user = req.user;
        try {
            const transactions = await Transaction.find(
                { $or: [{ senderId: user.id }, { receiverId: user.id }] }
            );
    
            // Customize the fields to include
            const selectedTransactions = transactions.map(transaction => ({
                type: transaction.senderId === user.id ? 'sent' : 'received',
                amount: transaction.amount,
                date: transaction.createdAt,
                name: transaction.senderId === user.id ?transaction.receiverName:transaction.senderName,
            }));
    
            return res.status(200).send({ status: 'success', 
                transactions: selectedTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())});
        } catch (error) {
            console.error('List transactions error:', error);
            return res.status(500).send({ status: 'error', message: 'Internal server error' });
        }
    }
    
}

export default new TransactionController;