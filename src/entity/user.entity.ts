import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    account_number: { type: mongoose.Schema.Types.Number, required: true, unique: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
    name: { type: mongoose.Schema.Types.String, required: true },
    account_balance: { type: mongoose.Schema.Types.Decimal128, required: true },
  },
  { timestamps: true }
);

export interface USER_SCHEMA extends mongoose.Document {
  account_number: number;
  password: string;
  email: string;
  name: string;
  account_balance: number;
}

const userEntity = mongoose.model<USER_SCHEMA>('users', userSchema);

export default module.exports = userEntity;
