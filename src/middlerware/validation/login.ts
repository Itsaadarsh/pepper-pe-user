import { body } from 'express-validator';

export default module.exports = () => {
  return [
    body('account_number').isLength({ min: 16, max: 16 }).withMessage('Invalid Account Number'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('Password must be between 5 - 30 characters'),
  ];
  
};
