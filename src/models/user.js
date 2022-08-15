import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});
const User = mongoose.model('User', schema);

// HELPERS
const getCleanUser = async (user) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }
};

module.exports = {
  User,
  getCleanUser
};