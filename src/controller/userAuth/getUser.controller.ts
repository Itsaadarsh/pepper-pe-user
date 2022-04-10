import { Request, Response } from 'express';
import { isAccountNumberAvailableRepo } from '../../repository/userDetails/userDetails.repo';

export const getUserController = async (req: Request, res: Response) => {
  try {
    const { account_number }: { account_number: number } = req.user;
    const userDetails = await isAccountNumberAvailableRepo(+account_number);

    if (userDetails.length == 0) {
      res.status(400).json({ error: true, data: { message: ['Invalid Account Number'] } });
      return;
    }

    const stringbalance = JSON.stringify(userDetails[0].account_balance);
    const account_bal = JSON.parse(stringbalance);
    const { $numberDecimal } = account_bal;

    const responseData = {
      name: userDetails[0].name,
      account_balance: +$numberDecimal,
      account_number: userDetails[0].account_number,
    };

    res.status(201).json({ error: false, data: responseData });
    return;
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
};
