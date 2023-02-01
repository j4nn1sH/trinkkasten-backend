import express from 'express';

import { Event } from '../models/event';
import path from 'path';

const getUpcoming = async (req, res) => {
  let endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  let events = await Event.find({ date: { $gt: Date(), $lt: endDate } }).sort({ date: 1 });
  res.status(200).send({'events': events})
};

const getEventById = async (req, res) => {
  const event = await Event.findOne({ _id: req.params.id })
  res.status(200).send({'event': event})
}

const createNewEvent = async (req, res) => {
  const event = new Event({
    title: req.body.title,
    subtitle: req.body.subtitle,
    date: req.body.date,
    location: req.body.location,
    shortDescription: req.body.shortDescription,
    description: req.body.description,
    ticketTypes: req.body.ticketTypes
  })
  try {
    const savedEvent = await event.save();
    res.status(200).send({ _id: savedEvent._id });
  } catch (error) {
    res.status(400).send(error);
  }
}

const getAllEvents = async (req, res) => {
  let events = await Event.find().sort({ date: 1 });
  res.status(200).send({'events': events})
}

module.exports = {
  // event.routes.js
  getUpcoming,
  getEventById,
  createNewEvent,
  getAllEvents
};