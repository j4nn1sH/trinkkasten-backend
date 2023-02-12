import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});
const Beverage = mongoose.model('Beverage', schema);

module.exports = {
  Beverage
};