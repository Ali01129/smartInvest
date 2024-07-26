import mongoose from "mongoose";

interface IPackage {
  name: string;
  price: number;
  validity: number;
  profit: number;
}

const packageSchema = new mongoose.Schema<IPackage>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    validity: { type: Number, required: true },
    profit: { type: Number, required: true },
  },
  { timestamps: true }
);

const Package = mongoose.model<IPackage>("Package", packageSchema);
export default Package;
