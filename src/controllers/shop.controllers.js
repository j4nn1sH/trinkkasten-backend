import express from 'express';

import { Shop } from '../models/shop';
import { User } from '../models/user';
import { History } from '../models/history';

const create = async (req, res) => {
  const shop = await Shop.findOne({name: req.body.name});
  if (shop) return res.status(400).send("Shop with this name already exists");

  const newShop = new Shop({
    name: req.body.name,
    managers: [req.user],
    users: [{
      user: req.user
    }]
  });
  await newShop.save();

  res.status(200).send(newShop);
};

const get = async (req, res) => {
  const shop = await Shop.findById(req.params.shop_id).populate('users.user').populate('managers');
  if (!shop) return res.status(400).send("Shop not found!");

  res.status(200).send(shop);
};

const update = async (req, res) => {
  const shop = await Shop.findById(req.params.shop_id);
  if (!shop) return res.status(400).send("Shop not found!");

  if (!shop.managers.includes(req.user._id)) return res.status(400).send("You are not a manager of this Shop!");

  shop.link = req.body.shop.link;
  shop.items = req.body.shop.items;
  shop.managers = req.body.shop.managers;

  await shop.save()
  res.status(200).send(shop);
};

const _delete = async (req, res) => {
  await Shop.deleteOne({_id: req.params.shop_id});
  res.status(200).send()
}


const getList = async (req, res) => {
  const shopList = await Shop.find();
  shopList.map(s => {
    return {
      id: s.id,
      name: s.name
    }
  });
  res.status(200).send(shopList);
};

const isManager = async (req, res) => {
  const shop = await Shop.findById(req.params.shop_id);
  if (!shop) return res.status(400).send("Shop not found!");

  res.status(200).send(shop.managers.includes(req.user._id));
};

const buy = async (req, res) => {

  const shop = await Shop.findById(req.params.shop_id);
  if (!shop) return res.status(400).send("Shop not found!")

  try {
    for (const u of req.body.users) {
      let user = await User.findById(u._id);
      if (!user) {
        return res.status(400).send('User not found');
      }
    }
  } catch (error) {
    return res.status(500).send('Error processing users');
  }

  const totalPrice = req.body.items.reduce((acc, b) => {
    acc += b.amount * b.price;
    return acc;
  }, 0);

  // Duplicate users array
  let users = req.body.users
  let tmpUsers = Array.from(users);

  shop.users.map(u => {
    tmpUsers.forEach(user => {
      if(u.user.equals(user._id)) {
        u.balance -= totalPrice / users.length
        tmpUsers.splice(tmpUsers.indexOf(user), 1);
      }
    })
    return u
  })
  tmpUsers.forEach(user => {
    shop.users.push({
      user: user._id,
      balance: -(totalPrice / users.length),
      hide: false
    })
  })
  await shop.save();

  let description = [];
  if(users.length == 1 && users[0]._id != req.user._id) {
    description = [`by ${req.user.firstName} ${req.user.lastName}`];
  } else if(users.length > 1) {
    description = [`Split with ${users.length} others`, `by ${req.user.firstName} ${req.user.lastName}`];
  };


  try {
    for (const user of users) {
      var history = new History({
        date: Date.now(),
        user: user._id,
        shop: shop._id,
        amount: -(totalPrice / users.length),
        items: req.body.items.map(i => {
          return {
            name: i.name,
            price: i.price,
            count: i.amount
          }
        }),
        description: description
      });
      history = await history.save();
    }
  } catch (error) {
    console.error(error);
  }

  res.status(200).send()
}

const pay = async (req, res) => {
  const user = await User.findById(req.body.user_id);
  if(!user) return res.status(400).send('User not found');

  const shop = await Shop.findById(req.params.shop_id);
  if (!shop) return res.status(400).send("Shop not found!")

  if(shop.users.filter(u => u.user.equals(user._id)).length <= 0) {
    shop.users.push({
      user: req.body.user_id,
      balance: 0,
      hide: false
    })
  }

  shop.users.map(u => {
    if(u.user.equals(user._id)) {
      u.balance += req.body.amount
    }
    return u
  })
  await shop.save();

  var history = new History({
    date: Date.now(),
    user: user._id,
    shop: shop._id,
    amount: req.body.amount,
    items: [],
    description: "Payed"
  });
  history = await history.save()

  res.status(200).send(history)
}

module.exports = {
  // shop.routes.js
  create,
  get,
  update,
  _delete,
  getList,
  isManager,
  buy,
  pay
};