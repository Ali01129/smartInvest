import mongoose from "mongoose";

interface IWallet {
  userId: string;
  usd: number;
  smartCoin: number;
  stackedCoins: number;
}

const walletSchema = new mongoose.Schema<IWallet>({
  userId: { type: String, required: true, unique: true },
  usd: { type: Number, required: true },
  smartCoin: { type: Number, required: true, default: 0 },
  stackedCoins: { type: Number, default: 0 },
});

const Wallet = mongoose.model<IWallet>("Wallet", walletSchema);
export default Wallet;
