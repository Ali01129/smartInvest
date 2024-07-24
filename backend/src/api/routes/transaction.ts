import express, { Request, Response, NextFunction } from "express";
import fetchUser from "../../middleware/fetchUser";
import Wallet from "../../models/wallet";
import Transaction from "../../models/transaction";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const router = express.Router();

router.put(
  "/send",
  fetchUser,
  async (req: AuthenticatedRequest, res: Response) => {
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

      const transaction = await Transaction.create({
        senderId: senderWallet.userId,
        receiverId: receiverWallet.userId,
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
);

router.put(
  "/deposit",
  fetchUser,
  async (req: AuthenticatedRequest, res: Response) => {
    const { amount } = req.body;
    const user = req.user;
    try {
      const wallet = await Wallet.findOne({ userId: user.id });
      if (!wallet) {
        return res
          .status(404)
          .send({ status: "error", message: "Wallet not found" });
      }
      wallet.usd += amount;
      await wallet.save();
      const transaction = await Transaction.create({
        senderId: wallet.userId,
        receiverId: "Stripe",
        amount: amount,
      });
      return res.status(200).send({
        status: "success",
        message: "Deposit successful",
        wallet,
        transaction,
      });
    } catch (error) {
      console.error("Deposit error:", error);
      return res
        .status(500)
        .send({ status: "error", message: "Internal server error" });
    }
  }
);

export default router;
