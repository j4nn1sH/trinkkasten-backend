import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  beverages: [{
    _id: String,
    name: String,
    price: Number,
    active: Boolean
  }],
  link: String,
  marketInteraction: [{
    date: Date,
    userId: String,
    amount: Number,
    description: String
  }]
});
const Kitchen = mongoose.model('Kitchen', schema);

module.exports = {
  Kitchen
};