import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  date: {type: Date, required: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  shop: {type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true},
  amount: {type: Number, required: true, transform: (v) => Math.round(parseFloat(v)*100) / 100},
  items: [{
    name: String,
    price: Number,
    count: Number
  }],
  description: [String]
});
const History = mongoose.model('History', schema);

module.exports = {
  History
};