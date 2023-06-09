import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  date: {type: Date, required: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {type: Number, required: true, transform: (v) => Math.round(parseFloat(v)*100) / 100},
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