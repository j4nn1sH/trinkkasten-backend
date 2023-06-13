import express from 'express';

import kitchenControllers from '../controllers/kitchen.controllers';

import checkAuth from '../middlewares/checkAuth.middleware';

const router = express.Router();

router.post('', checkAuth, kitchenControllers.createKitchen);
router.get('', kitchenControllers.getKitchenList);

router.get('/:kitchen', kitchenControllers.getKitchen);
router.put('/:kitchen', checkAuth, kitchenControllers.updateKitchen);
router.post('/:kitchen', kitchenControllers.buy)
router.post('/:kitchen/pay', kitchenControllers.pay)

router.get('/:kitchen/isManager', checkAuth, kitchenControllers.getKitchen);

module.exports = router;