import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String,required: false},
  phantomWalletAddress: { type: String, unique: true ,required: false},
});

const User = mongoose.model('User', UserSchema);
export default User;
