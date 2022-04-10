import { Request, Response } from 'express';
import validate from '../../middlerware/reqBodyValidation';
import { isAccountNumberAvailableRepo } from '../../repository/userDetails/userDetails.repo';
import { insertTransaction } from '../../repository/transaction/transaction.repo';
import { producerEmit } from '../../kafka/producer';

export const postTransactionController = async (req: Request, res: Response) => {
  try {
    // Server side validation
    if (validate(req, res)) {
      return;
    }

    const { account_number }: { account_number: number } = req.user;
    const from: number = account_number;

    const { to, amount, remarks }: { to: number; amount: number; remarks: string } = req.body;

    if (from == to) {
      res.status(400).json({ error: true, data: { message: ['Incorrect transfer'] } });
      return;
    }

    const isFromAccountExist = await isAccountNumberAvailableRepo(+from);

    if (isFromAccountExist.length == 0) {
      res.status(400).json({ error: true, data: { message: ['Your Account Number is incorrect!'] } });
      return;
    }

    if (amount > isFromAccountExist[0].account_balance) {
      res.status(400).json({
        error: true,
        data: {
          message: [
            `Insufficient funds, your account balance is rupees ${isFromAccountExist[0].account_balance}`,
          ],
        },
      });
      return;
    }

    const isToAccountExist = await isAccountNumberAvailableRepo(+to);

    if (isToAccountExist.length == 0) {
      res.status(400).json({ error: true, data: { message: ['Recipients Account Number is incorrect!'] } });
      return;
    }

    const updateFromBal = +isFromAccountExist[0].account_balance - +amount;
    isFromAccountExist[0].account_balance = updateFromBal;
    await isFromAccountExist[0].save();

    const updateToBal = +amount + +isToAccountExist[0].account_balance;
    isToAccountExist[0].account_balance = updateToBal;
    await isToAccountExist[0].save();

    await insertTransaction(from, to, amount, remarks);

    res.status(201).json({
      error: false,
      data: {
        message: [
          `Amount of Rupees ${amount} is successfully transfered to account number ${isToAccountExist[0].account_number}, 
          your account balance is now rupees ${isFromAccountExist[0].account_balance}`,
        ],
      },
    });

    const kafkaData = JSON.stringify({
      user_1: from,
      user_1_balance: updateFromBal,
      user_2: to,
      user_2_balance: updateToBal,
    });

    await producerEmit('pp_admin_topic', kafkaData, 'transactionCreated');
    return;
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
};
