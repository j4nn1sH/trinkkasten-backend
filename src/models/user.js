import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  balance: {type: mongoose.Types.Decimal128, transform: (v) => parseFloat(v)},
  type: String,
  hide: {type: Boolean, default: false}
});
const User = mongoose.model('User', schema);

module.exports = {
  User
};