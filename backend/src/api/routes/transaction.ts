import express from 'express';
const router = express.Router();

router.post('/send', async (req:express.Request, res:express.Response) => {
    const {address, amount} = req.body;
    
});

export default router;