import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  language: String,
  category: String,
  question: String,
  answer: String,
  hint: String,
  level: Number, // 1-5
});
const Vocabulary = mongoose.model('Vocabulary', schema);

module.exports = {
  Vocabulary
};