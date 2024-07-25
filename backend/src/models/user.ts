import mongoose from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  referralCode?: string;
  phantomWalletAddress?: string;
  otpCode?: string;
  packagesSubscribed?: {
    packageId: mongoose.Types.ObjectId;
    subscribedAt?: Date;
  }[];
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, required: false },
  phantomWalletAddress: { type: String, unique: true, required: false },
  otpCode: { type: String, required: false },
  packagesSubscribed: {
    type: [
      {
        packageId: { type: mongoose.Types.ObjectId, required: true },
        subscribedAt: { type: Date, default: Date.now },
      },
    ],
    required: false,
  },

});

const User = mongoose.model("User", UserSchema);
export default User;
