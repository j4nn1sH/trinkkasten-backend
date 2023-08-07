import express from 'express';

import { Shop } from '../models/shop';
import { User } from '../models/user';
import { History } from '../models/history'

const getHistory = async (req, res) => {
  const shop = await Shop.findById(req.params.shop_id)
  if(!shop) return res.status(400).send("Kitchen not found!")


  const history = await History.find({user: req.user._id, shop: shop._id}).sort({date: 'desc'}).limit(10)
  res.status(200).send(history);
}

module.exports = {
  // shop.routes.js
  getHistory
};