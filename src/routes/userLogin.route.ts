import express from 'express';
import { userLoginController } from '../controller/userAuth/userAuth.controller';
import loginValidation from '../middlerware/validation/login';

const router = express.Router();

router.post('/login', loginValidation(), userLoginController);

export { router as userLoginRoute };
