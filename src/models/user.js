import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String
});
const User = mongoose.model('User', schema);

// HELPERS
const getCleanUser = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    description: user.description
  }
};

module.exports = {
  User,
  getCleanUser
};