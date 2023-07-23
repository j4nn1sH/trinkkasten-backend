import express from 'express';

import { Kitchen } from '../models/kitchen';
import { User } from '../models/user';
import { History } from '../models/history';

const createKitchen = async (req, res) => {
  const kitchen = await Kitchen.findOne({name: req.body.name});
  if (kitchen) return res.status(400).send("Kitchen already exists");
  const newKitchen = new Kitchen({
    name: req.body.name,
    managers: [req.user._id],
  });
  await newKitchen.save();

  res.status(200).send(newKitchen);
};

const getKitchen = async (req, res) => {
  const kitchen = await Kitchen.findOne({name: req.params.kitchen}).populate('users.user');
  if (!kitchen) return res.status(400).send("Kitchen not found!");

  res.status(200).send(kitchen);
};

const updateKitchen = async (req, res) => {
  const kitchen = await Kitchen.findOne({name: req.params.kitchen});
  if (!kitchen) return res.status(400).send("Kitchen not found!");

  if (!kitchen.managers.includes(req.user._id)) return res.status(400).send("You are not a manager of this kitchen!");

  // kitchen.name = req.body.name;
  kitchen.link = req.body.kitchen.link;
  kitchen.beverages = req.body.kitchen.beverages;
  kitchen.managers = req.body.kitchen.managers;
  kitchen.users = req.body.kitchen.users;

  await kitchen.save()
  res.status(200).send(kitchen);
};


const getKitchenList = async (req, res) => {
  const kitchens = await Kitchen.find();
  res.status(200).send(kitchens.map(k => k.name));
};

const isManager = async (req, res) => {
  const kitchen = await Kitchen.findOne({name: req.params.kitchen});
  if (!kitchen) return res.status(400).send("Kitchen not found!");
  res.status(200).send(kitchen.managers.includes(req.user._id));
};

const getBeverages = async (req, res) => {
  const kitchen = await Kitchen.findOne({name: req.params.kitchen});
  if (!kitchen) return res.status(400).send("Kitchen not found!")
  res.status(200).send(kitchen.beverages.filter(b => b.active));
};

const getAllBeverages = async (req, res) => {
  const kitchen = await Kitchen.findOne({name: req.params.kitchen});
  if (!kitchen) return res.status(400).send("Kitchen not found!")
  res.status(200).send(kitchen.beverages);
};

const buy = async (req, res) => {
  const user = await User.findById(req.body.user_id);
  if(!user) return res.status(400).send('User not found');

  const kitchen = await Kitchen.findOne({name: req.params.kitchen});
  if (!kitchen) return res.status(400).send("Kitchen not found!")

  if(kitchen.users.filter(u => u.user.equals(user._id)).length <= 0) {
    kitchen.users.push({
      user: req.body.user_id,
      balance: 0,
      hide: false
    })
  }

  const totalPrice = req.body.beverages.reduce((acc, b) => {
    acc += b.amount * b.price;
    return acc;
  }, 0);

  kitchen.users.map(u => {
    if(u.user.equals(req.body.user_id)) {
      u.balance -= totalPrice
    }
    return u
  })
  await kitchen.save();

  var history = new History({
    date: Date.now(),
    user: user._id,
    kitchen: kitchen._id,
    amount: -totalPrice,
    beverages: req.body.beverages.map(b => {
      return {
        name: b.name,
        price: b.price,
        count: b.amount
      }
    })
  });
  history = await history.save()

  res.status(200).send(history)
}

const pay = async (req, res) => {
  const user = await User.findById(req.body.user_id);
  if(!user) return res.status(400).send('User not found');

  const kitchen = await Kitchen.findOne({name: req.params.kitchen});
  if (!kitchen) return res.status(400).send("Kitchen not found!")

  if(kitchen.users.filter(u => u.user.equals(user._id)).length <= 0) {
    kitchen.users.push({
      user: req.body.user_id,
      balance: 0,
      hide: false
    })
  }

  kitchen.users.map(u => {
    if(u.user.equals(user._id)) {
      u.balance += req.body.amount
    }
    return u
  })
  await kitchen.save();

  var history = new History({
    date: Date.now(),
    user: user._id,
    kitchen: kitchen._id,
    amount: req.body.amount,
    beverages: []
  });
  history = await history.save()

  res.status(200).send(history)
}

module.exports = {
  // shop.routes.js
  createKitchen,
  getKitchen,
  updateKitchen,
  getKitchenList,
  isManager,
  getBeverages,
  getAllBeverages,
  buy,
  pay
};