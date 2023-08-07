import express from 'express';

import { User } from '../models/user';
import { Shop } from '../models/shop';

const router = express.Router();

const getBalanceList = async (req, res) => {
  const shops = await Shop.find();

  var balanceList = []

  shops.forEach(s => {
    s.users.forEach(u => {
      if(u.user.equals(req.user._id)) {
        balanceList.push({
          shop_id: s._id,
          name: s.name,
          balance: u.balance,
          link: s.link,
          hide: u.hide
        })
      }
    })
  })

  res.status(200).send(balanceList);
}

const toggleHide = async (req, res) => {
  const shop = await Shop.findById(req.params.shop_id);
  if(!shop) return res.status(400).send("Shop not found!");

  shop.users.forEach(u => {
    if(u.user.equals(req.user._id)) {
      u.hide = !u.hide;
    }
  });

  await shop.save();

  res.status(200).send();
}

module.exports = {
  // user.routes.js
  getBalanceList,
  toggleHide
};