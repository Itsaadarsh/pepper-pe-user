import express from 'express';
import authMiddleware from '../middlerware/authMiddleware';
import { getUserController } from '../controller/userAuth/getUser.controller';

const router = express.Router();

router.get('/get-user', authMiddleware, getUserController);

export { router as getUserRoute };
