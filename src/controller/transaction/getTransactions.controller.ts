import { Request, Response } from 'express';
import { getTransactionsRepo } from '../../repository/transaction/transaction.repo';

export const getTransactionsController = async (req: Request, res: Response) => {
  try {
    const { account_number }: { account_number: number } = req.user;
    const { debit, credit } = await getTransactionsRepo(account_number);

    const responseData: any = [];

    debit.forEach(trans => {
      const stringAmt = JSON.stringify(trans.amount);
      const amount = JSON.parse(stringAmt);
      const { $numberDecimal } = amount;

      responseData.push({
        id: trans._id,
        from: trans.from,
        to: trans.to,
        amount: +$numberDecimal,
        remarks: trans.remarks,
        timestamp: trans.createdAt,
        flow: 'DEBIT',
      });
    });

    credit.forEach(trans => {
      const stringAmt = JSON.stringify(trans.amount);
      const amount = JSON.parse(stringAmt);
      const { $numberDecimal } = amount;

      responseData.push({
        id: trans._id,
        from: trans.from,
        to: trans.to,
        amount: +$numberDecimal,
        remarks: trans.remarks,
        timestamp: trans.createdAt,
        flow: 'CREDIT',
      });
    });

    res.status(201).json({ error: false, data: responseData });
    return;
  } catch (err) {
    res.status(201).json({ error: true, data: { message: [err.message] } });
  }
};
