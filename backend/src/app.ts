import mongoose from 'mongoose';
import express, { Application } from 'express';
import authService from './api/routes/auth';
import transactionService from './api/routes/transaction';

interface Env {
  MONGO_URI: string;
}

const env: Env = {
  MONGO_URI: "mongodb+srv://bitfusionlabs:eHWh89YjXwSR24Ie@smart-invest.tovgqai.mongodb.net/?retryWrites=true&w=majority&appName=Smart-Invest"
};

mongoose.connect(env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const app: Application = express();
const port: number = 5000;

app.use(express.json());

app.use('/auth', authService);
app.use('/transaction', transactionService);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
