import mongoose from 'mongoose';

interface IWallet {
    userId: string;
    usd: number;
    smartCoin: number;
}

const walletSchema=new mongoose.Schema<IWallet>({
    userId:{type:String,required:true,unique:true},
    usd:{type:Number,required:true},
    smartCoin:{type:Number,required:true}
});

const Wallet =mongoose.model<IWallet>('Wallet',walletSchema);
export default Wallet;