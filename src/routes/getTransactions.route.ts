import express from 'express';
import authMiddleware from '../middlerware/authMiddleware';
import { getTransactionsController } from '../controller/transaction/getTransactions.controller';

const router = express.Router();

router.get('/transaction', authMiddleware, getTransactionsController);

export { router as getTransactionsRoute };
