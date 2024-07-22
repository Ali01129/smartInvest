import mongoose from 'mongoose';
import express, { Application, Request, Response } from 'express';

// Type for environment variables (if you use .env file for storing credentials)
interface Env {
  MONGO_URI: string;
}

const env: Env = {
  MONGO_URI: "mongodb+srv://bitfusionlabs:eHWh89YjXwSR24Ie@smart-invest.tovgqai.mongodb.net/?retryWrites=true&w=majority&appName=Smart-Invest"
};

// Connection to MongoDB
mongoose.connect(env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Adding Express.js
const app: Application = express();
const port: number = 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
