import mongoose from "mongoose";
import express, { Application } from "express";
import authService from "./routes/auth";
import transactionService from "./routes/transaction";
import packageService from "./routes/packages";
import walletService from "./routes/wallet";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

interface Env {
  MONGO_URI: string;
}

const env: Env = {
  MONGO_URI:
 "mongodb+srv://bitfusionlabs:eHWh89YjXwSR24Ie@smart-invest.tovgqai.mongodb.net/?retryWrites=true&w=majority&appName=Smart-Invest",
};

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

 
const app: Application = express();
const port: number = 5000;
app.use(cors());
app.use(express.json());

app.use("/auth", authService);
app.use("/transaction", transactionService);
app.use("/package", packageService);
app.use("/wallet", walletService);
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
