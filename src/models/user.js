import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
},
{
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      delete ret.password;
    }
  }
});

const User = mongoose.model('User', schema);

module.exports = {
  User
};