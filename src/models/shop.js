import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  items: { type: [{
    _id: { type: String, required: true, unique: true, default: () => new Date().getTime().toString() },
    name: String,
    price: Number,
    active: { type: Boolean, default: true },
  }], default: []},
  link: { type: String, default: '' },
  managers: { type: [ mongoose.Schema.Types.ObjectId ], ref: "User", required: true },
  users: { type: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    balance: { type: Number, transform: (v) => Math.round(parseFloat(v)*100) / 100, default: 0 },
    hide: { type: Boolean, default: false },
  }], default: []},
},
{
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
    }
  }
});
const Shop = mongoose.model('Shop', schema);

module.exports = {
  Shop
};