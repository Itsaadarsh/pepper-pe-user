import { validationResult } from 'express-validator';
import express from 'express';

// Validating server side request body
const validate = (req: express.Request, res: express.Response) => {
  const valiErrors = validationResult(req);
  if (!valiErrors.isEmpty()) {
    const errArr: Array<string> = [];
    valiErrors.array().forEach(err => {
      errArr.push(err.msg);
    });
    res.status(201).json({ error: true, data: { message: errArr } });
    return true;
  }
  return false;
};

export default validate;
