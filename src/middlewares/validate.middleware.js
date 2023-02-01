import { body, validationResult } from 'express-validator'

import { User } from '../models/user';

const registerRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),

    body("email").custom(async (value, { req }) => { // ? Should i test this here or in auth.controller?
      if (await User.findOne({ email: value })) {
        throw new Error('Email already in use');
      }
      return true;
    }),

    body("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one sepcial character"),

    body("firstName")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),

    body("lastName")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),
  ]
}

const validate = (req, res, next) => {
  //console.log("validate", req.body)
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  registerRules,
  validate,
}