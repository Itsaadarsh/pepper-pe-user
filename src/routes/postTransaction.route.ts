import express from 'express';
import authMiddleware from '../middlerware/authMiddleware';
import { postTransactionController } from '../controller/transaction/postTrasaction.controller';
import transactionValidation from '../middlerware/validation/transaction';

const router = express.Router();

router.post('/transaction', authMiddleware, transactionValidation(), postTransactionController);

export { router as postTransactionRoute };
