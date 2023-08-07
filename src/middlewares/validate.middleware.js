import { body, validationResult } from 'express-validator'

import { User } from '../models/user';

const registerRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .normalizeEmail(),

    body("email").custom(async (value, { req }) => {
      if (await User.findOne({ email: value })) {
        throw new Error('Email already in use');
      }
      return true;
    }),

    body("firstName")
      .isLength({ min: 3 })
      .withMessage("The name must have minimum length of 3")
      .trim(),

    body("lastName")
      .isLength({ min: 3 })
      .withMessage("The name must have minimum length of 3")
      .trim(),
  ]
}

const validate = (req, res, next) => {
  //console.log("validate", req.body)
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  return res.status(422).json(
    errors.array().map((err) => err.msg),
  )
}

module.exports = {
  registerRules,
  validate,
}