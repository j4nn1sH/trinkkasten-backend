import express from 'express';

import { Kitchen } from '../models/kitchen';
import { User } from '../models/user';
import { History } from '../models/history'

const addBeverage = async (req, res) => {
  const kitchen = await Kitchen.findOne();
  kitchen.beverages.push(req.body);
  await kitchen.save();
  res.status(200).send(kitchen.beverages);
};

const getBeverages = async (req, res) => {
  const kitchen = await Kitchen.findOne();
  res.status(200).send(kitchen.beverages.filter(b => b.active));
};

const getAllBeverages = async (req, res) => {
  const kitchen = await Kitchen.findOne();
  res.status(200).send(kitchen.beverages);
};

const buy = async (req, res) => {
  const user = await User.findById(req.body.user_id);
  if(!user) return res.status(400).send('User not found');

  const totalPrice = req.body.beverages.reduce((acc, b) => {
    acc += b.amount * b.price;
    return acc;
  }, 0);

  user.balance -= totalPrice
  await user.save();

  var history = new History({
    date: Date.now(),
    user: user._id,
    amount: totalPrice,
    beverages: req.body.beverages.map(b => {
      return {
        name: b.name,
        price: b.price,
        count: b.amount
      }
    })
  });
  history = await history.save()

  res.status(200).send("history")
}

const toggleActive = async (req, res) => {
  const kitchen = await Kitchen.findOne();
  const beverage = kitchen.beverages.find((b) => b._id === req.params.id);
  if (!beverage) res.status(400).send("Beverage not found!")

  beverage.active = !beverage.active

  await kitchen.save()

  res.status(200).send(beverage)
}

const getLink = async (req, res) => {
  const kitchen = await Kitchen.findOne()
  res.status(200).send({link: kitchen.link})
}

module.exports = {
  // shop.routes.js
  addBeverage,
  getBeverages,
  getAllBeverages,
  buy,
  toggleActive,
  getLink
};