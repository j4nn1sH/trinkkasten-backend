import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  beverages: {type: [{
    _id: {type: String, required: true, unique: true, default: () => new Date().getTime().toString()},
    name: String,
    price: Number,
    active: {type: Boolean, default: true},
  }], default: []},
  link: {type: String, default: ''},
  managers: {type: [
    mongoose.Schema.Types.ObjectId
  ], required: true},
  users: {type: [{
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    balance: {type: Number, transform: (v) => Math.round(parseFloat(v)*100) / 100, default: 0},
    hide: {type: Boolean, default: false},
  }], default: []},
});
const Kitchen = mongoose.model('Kitchen', schema);

module.exports = {
  Kitchen
};