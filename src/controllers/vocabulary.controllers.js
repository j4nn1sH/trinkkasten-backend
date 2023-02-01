import express from 'express';

import { Vocabulary } from '../models/vocabulary';
import path from 'path';

const getAll = async (req, res) => {
  const vocabularies = await Vocabulary.find().sort({ level: -1 });
  res.status(200).send(vocabularies)
};

const getLanguages = async (req, res) => {
  const languages = await Vocabulary.find().distinct('language');
  res.status(200).send(languages)
};

const getByLanguage = async (req, res) => {
  const vocabularies = await Vocabulary.find({ language: req.params.language });
  res.status(200).send(vocabularies)
};

const getOne = async (req, res) => {
  const vocabulary = await Vocabulary.findById(req.params.id);
  if (!vocabulary) return res.status(400).send('Vocabulary not found');
  res.status(200).send(vocabulary);
};

const createNewVocabulary = async (req, res) => {
  const vocabulary = new Vocabulary({
    language: req.body.language,
    category: req.body.category,
    question: req.body.question,
    answer: req.body.answer,
    hint: req.body.hint,
    level: 0
  })
  try {
    const savedVocabulary = await vocabulary.save();
    res.status(200).send(savedVocabulary);
  } catch (error) {
    res.status(400).send(error);
  }
}

const update = async (req, res) => {
  const vocabulary = await Vocabulary.findById(req.params.id);
  if (!vocabulary) return res.status(400).send('Vocabulary not found');
  vocabulary.level = req.body.level;
  try {
    const savedVocabulary = await vocabulary.save();
    res.status(200).send({ _id: savedVocabulary._id });
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  // vocabulary.routes.js
  getAll,
  getLanguages,
  getByLanguage,
  getOne,
  createNewVocabulary,
  update
};