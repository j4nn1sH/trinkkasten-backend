import express from 'express';

import {User} from '../models/user';
import {Kitchen} from '../models/kitchen';

const router = express.Router();

const getBalances = async (req, res) => {
  const kitchens = await Kitchen.find();

  var balances = []

  kitchens.forEach(k => {
    k.users.forEach(u => {
      if(u.user.equals(req.user._id)) {
        balances.push({
          kitchen: k.name,
          link: k.link,
          balance: u.balance,
          hide: u.hide
        })
      }
    })
  })

  res.status(200).send(balances);
}

const toggleHide = async (req, res) => {
  const kitchen = await Kitchen.findOne({name: req.params.kitchen});
  if(!kitchen) return res.status(400).send("Kitchen not found!");

  kitchen.users.forEach(u => {
    if(u.user.equals(req.user._id)) {
      u.hide = !u.hide;
    }
  });

  await kitchen.save();

  res.status(200).send();
}

module.exports = {
  // user.routes.js
  getBalances,
  toggleHide
};