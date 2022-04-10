import transactionEntity from '../../entity/transaction.entity';

const getTransactionsRepo = async (account_number: number) => {
  const debitedTransactions = await transactionEntity.find({ from: account_number });
  const creditedTransactions = await transactionEntity.find({ to: account_number });
  return { debit: debitedTransactions, credit: creditedTransactions };
};

const insertTransaction = async (from: number, to: number, amount: number, remarks: string) => {
  return await new transactionEntity({ from, to, amount, remarks }).save();
};

const updateDepositWithdraw = async (remarks: string, account_number: number, amount: number) => {
  if (remarks == 'DEPOSIT') {
    await new transactionEntity({
      from: 1111222233334444,
      to: account_number,
      amount: amount,
      remarks: 'DEPOSITED FROM THE BANK',
    }).save();
  }
  if (remarks == 'WITHDRAW') {
    await new transactionEntity({
      from: account_number,
      to: 1111222233334444,
      amount: amount,
      remarks: 'WITHDRAWED FROM THE BANK',
    }).save();
  }
};

export { insertTransaction, getTransactionsRepo, updateDepositWithdraw };
