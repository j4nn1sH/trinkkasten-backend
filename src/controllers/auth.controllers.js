import express from 'express';

import bcrypt from 'bcrypt'; // Password encryption
import jwt from 'jsonwebtoken'; // Authorization via Token

import { User } from '../models/user';

const register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  var user = new User({
    email: req.body.email,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  var anyUser = await User.findOne();
  if (!anyUser) {
    user.manager = true;
  }

  try {
    user = await user.save();
    res.status(200).send(user.toJSON());
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json(['Invalid email or password']);

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json(['Invalid email or password']);

  // ? Access + Refresh Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 3600 });
  res.status(200).send({ token: token });
};

const me = async (req, res) => {
  res.status(200).send(req.user.toJSON());
};

module.exports = {
  // auth.routes.js
  register,
  login,
  me
};