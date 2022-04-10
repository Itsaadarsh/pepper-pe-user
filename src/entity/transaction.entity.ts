import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.Number, required: true },
    to: { type: mongoose.Schema.Types.Number, required: true },
    amount: { type: mongoose.Schema.Types.Decimal128, required: true },
    remarks: { type: mongoose.Schema.Types.String, required: true },
  },
  { timestamps: true }
);

export interface TRANSACTION_SCHEMA extends mongoose.Document {
  from: number;
  to: number;
  amount: number;
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

const transactionEntity = mongoose.model<TRANSACTION_SCHEMA>('transactions', transactionSchema);

export default module.exports = transactionEntity;
