import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  balance: {type: mongoose.Types.Decimal128, transform: (v) => Math.round(parseFloat(v)*100) / 100, default: 0},
  hide: {type: Boolean, default: false},
  manager: {type: Boolean, default: false},
});
schema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.model('User', schema);

module.exports = {
  User
};