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
          balance: u.balance
        })
      }
    })
  })

  res.status(200).send(balances);
}

module.exports = {
  // user.routes.js
  getBalances
};