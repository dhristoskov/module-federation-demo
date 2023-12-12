import { validationResult } from 'express-validator';

const checkErrors = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
};

export default checkErrors;
