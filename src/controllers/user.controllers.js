import express from 'express';

import {User} from '../models/user';

const router = express.Router();

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users.filter(u => u.hide === false).map(u => u.toJSON()));
}

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users.map(u => u.toJSON()));
}

const toogleHide = async (req, res) => {
  var user = req.user
  user.hide = !user.hide
  user = await user.save()
  res.status(200).send(user)
}

const addMoney = async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user) return res.status(400).send('User not found');
  user.balance = Number(user.balance) + Number(req.body.amount);
  await user.save();

  res.status(200).send(user.toJSON());
}

module.exports = {
  // user.routes.js
  getUsers,
  getAllUsers,
  toogleHide,
  addMoney
};