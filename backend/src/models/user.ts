import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    referralCode: string;
    phantomWalletAddress: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    referralCode: { type: String, required: false },
    phantomWalletAddress: { type: String, required: false },
});

const User = model<IUser>('User', userSchema);

export default User;