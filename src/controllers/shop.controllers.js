import express from 'express';

import {Beverage} from '../models/beverage';
import {User} from '../models/user';

const router = express.Router();

const buyBeverages = async (req, res) => {
  // Check if user exists
  const user = await User.findById(req.body.user_id);
  if(!user) return res.status(400).send('User not found');

  // Update beverage quantities
  req.body.beverages.forEach(async b => {
    const beverage = await Beverage.findById(b._id);
    beverage.stock -= b.amount;
    if(beverage.stock < 0) return res.status(400).send('Not enough beverages in stock');
    await beverage.save();
  });

  // Calculate total price
  const totalPrice = req.body.beverages.reduce((acc, b) => {
    acc += b.amount * b.price;
    return acc;
  }, 0);

  // Update user balance
  user.balance -= totalPrice;
  await user.save();

  res.status(200).send({message: 'Beverages bought successfully'});
}

const getBeverages = async (req, res) => {
  const beverages = await Beverage.find({stock: {$gt: 0}});
  res.status(200).send(beverages);
}

const toggleHide = async (req, res) => {
  const user = await User.findById(req.body.user_id);
  if(!user) return res.status(400).send('User not found');

  user.hide = !user.hide;
  await user.save();

  res.status(200).send(user);
}

module.exports = {
  // shop.routes.js
  buyBeverages,
  getBeverages,
  toggleHide
};