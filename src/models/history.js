import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  date: {type: Date, required: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {type: Date, required: true},
  beverages: [{
    name: String,
    price: Number,
    count: Number
  }],
});
const History = mongoose.model('History', schema);

module.exports = {
  History
};