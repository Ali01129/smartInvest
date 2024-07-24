import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
    senderId: string;
    receiverId: string;
    amount: number;
}

const transactionSchema = new Schema<ITransaction>({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    amount: { type: Number, required: true },
}, { timestamps: true });

const Transaction=mongoose.model<ITransaction>('Transaction', transactionSchema);
export default Transaction;