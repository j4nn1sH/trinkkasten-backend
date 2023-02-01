import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String,
  subtitle: String,
  date: Date,
  location: String,
  shortDescription: String,
  description: String,
  ticketTypes: [{
    designation: String,
    price: Number,
  }]
});
const Event = mongoose.model('Event', schema);

module.exports = {
  Event
};