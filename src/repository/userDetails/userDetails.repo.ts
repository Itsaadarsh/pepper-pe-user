import userEntity from '../../entity/user.entity';
import { updateDepositWithdraw } from '../transaction/transaction.repo';

const isEmailAvailableRepo = async (email: string) => {
  return await userEntity.find({ email });
};

const isAccountNumberAvailableRepo = async (account_number: number) => {
  return await userEntity.find({ account_number });
};

const insertNewUser = async (
  account_number: number,
  password: string,
  email: string,
  name: string,
  account_balance: number
) => {
  await new userEntity({ account_number, account_balance, email, name, password }).save();
};

const updateUserBalance = async (
  account_number: number,
  account_balance: number,
  remarks: string,
  amount: number
) => {
  const user = await isAccountNumberAvailableRepo(account_number);
  user[0].account_balance = account_balance;
  await user[0].save();

  await updateDepositWithdraw(remarks, account_number, amount);
};

export { isEmailAvailableRepo, isAccountNumberAvailableRepo, insertNewUser, updateUserBalance };
