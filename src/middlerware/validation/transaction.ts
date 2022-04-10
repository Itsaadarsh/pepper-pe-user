import { body } from 'express-validator';

export default module.exports = () => {
  return [
    body('to').isLength({ min: 16, max: 16 }).withMessage('Invalid "to" Account Number'),
    body('amount').isNumeric().withMessage('Amount should be an integer'),
  ];
};
