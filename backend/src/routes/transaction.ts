import express from 'express';
import fetchUser from '../middleware/fetchUser';
import transactionController from '../controllers/transactionController';

const router = express.Router();

//send money
router.post("/send",fetchUser,transactionController.send);

//deposit money
router.put('/deposit', fetchUser, transactionController.deposit);

//conversion
router.post('/convert', fetchUser, transactionController.convert);

//withdraw
router.post('/withdraw', fetchUser, transactionController.withdraw);

//list all the transcations
router.get('/list', transactionController.list);

//find by userid
router.get('/list_by_user', fetchUser, transactionController.list_by_user); 

export default router;