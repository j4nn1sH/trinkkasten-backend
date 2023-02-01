import express from 'express';

import eventControllers from '../controllers/events.controllers';

const router = express.Router();

router.post('/', eventControllers.createNewEvent);
router.get('/', eventControllers.getAllEvents);
router.get('/upcoming', eventControllers.getUpcoming);
router.get('/:id', eventControllers.getEventById);

module.exports = router;
