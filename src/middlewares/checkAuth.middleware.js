import jwt from 'jsonwebtoken';

import { User } from '../models/user';

module.exports = async function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(403).send('Access Denied!');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(verified._id);
    next();
  } catch (err) {
    res.status(403).send('Invalid Token');
  }
};
