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

    body("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("Your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("Your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Your password should have at least one special character"),

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