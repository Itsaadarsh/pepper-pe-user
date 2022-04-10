import { Request, Response } from 'express';
import validate from '../../middlerware/reqBodyValidation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isAccountNumberAvailableRepo } from '../../repository/userDetails/userDetails.repo';

export const userLoginController = async (req: Request, res: Response) => {
  try {
    // Server side validation
    if (validate(req, res)) {
      return;
    }

    const { account_number, password }: { account_number: number; password: string } = req.body;
    const isAccountNumberexist = await isAccountNumberAvailableRepo(+account_number);

    if (isAccountNumberexist.length == 0) {
      res.status(201).json({ error: true, data: { message: ['Invalid Account Number'] } });
      return;
    }

    bcrypt.compare(password, isAccountNumberexist[0].password, (err, hash) => {
      if (err || hash === false) {
        res.status(201).json({ error: true, data: { message: [`Incorrect Password, Try Again!`] } });
        return;
      }

      // Generating JWT Token
      const token: string = jwt.sign(
        { account_number: isAccountNumberexist[0].account_number },
        process.env.JWT_TOKEN!,
        {
          expiresIn: '24h',
        }
      );

      res.status(201).json({ error: false, data: { token } });
      return;
    });
  } catch (err) {
    res.status(201).json({ error: true, data: { message: [err.message] } });
  }
};
