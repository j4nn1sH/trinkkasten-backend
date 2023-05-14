import express from 'express';

import kitchenControllers from '../controllers/kitchen.controllers';

const router = express.Router();

router.post('/buy', kitchenControllers.buy)
router.get('/link', kitchenControllers.getLink)
router.post('/beverages', kitchenControllers.addBeverage);
router.get('/beverages', kitchenControllers.getBeverages);
router.get('/beverages/all', kitchenControllers.getAllBeverages);
router.put('/beverages/:id/toggleActive', kitchenControllers.toggleActive)

module.exports = router;