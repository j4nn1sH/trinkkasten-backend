import express from 'express';

import { Kitchen } from '../models/kitchen';
import { User } from '../models/user';
import { History } from '../models/history'

const getUserHistory = async (req, res) => {
  const kitchen = await Kitchen.findOne({name: req.params.kitchen})
  if(!kitchen) return res.status(400).send("Kitchen not found!")


  const history = await History.find({user: req.user._id, kitchen: kitchen._id}).sort({date: 'desc'}).limit(10)
  res.status(200).send(history);
}

module.exports = {
  // shop.routes.js
  getUserHistory
};