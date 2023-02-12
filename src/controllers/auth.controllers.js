import express from 'express';

import bcrypt from 'bcrypt'; // Password encryption
import jwt from 'jsonwebtoken'; // Authorization via Token

import { User } from '../models/user';

const register = async (req, res) => {
  console.log("register", req.body)

  // ? Hier oder in Input Validation?
  // const emailExists = await User.findOne({ email: req.body.email });
  // if (emailExists) return res.status(400).send('Email already in use');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    type: "normal",
    balance: 0
  });

  try {
    const savedUser = await user.save();
    res.status(200).send({ _id: savedUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  // ? Access + Refresh Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 3600 });
  res.status(200).send({ token: token, expiresIn: 3600 });
};

const me = async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) return res.status(400).send('User not found')
  // Remove password from user
  user.password = undefined;
  res.status(200).send(user);
};

const getAllUsers = async (req, res) => {
  const users = await User.find({hide: false}).select('-password');
  res.status(200).send(users);
};

module.exports = {
  // auth.routes.js
  register,
  login,
  me,
  // shop.routes.js
  getAllUsers
};