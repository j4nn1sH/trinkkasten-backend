import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { Shop } from '../models/shop';

module.exports = async function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(403).send('Access Denied!');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(verified.uuid);
  } catch (err) {
    res.status(403).send('Invalid Token');
  }
  const shop = await Shop.findById(req.params.shop_id);
  if (!shop) return res.status(400).send("Shop not found!")

  if(shop.managers.includes(req.user._id)) return next();

  res.status(400).send("You are not a manager of this Shop!");
};
