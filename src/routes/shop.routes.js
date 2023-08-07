import express from 'express';

import shopControllers from '../controllers/shop.controllers';

import checkAuth from '../middlewares/checkAuth.middleware';
import checkManager from '../middlewares/checkManager.middleware';

const router = express.Router();

router.get('', shopControllers.getList);
router.post('', checkAuth, shopControllers.create);

router.get('/:shop_id', shopControllers.get);
router.put('/:shop_id', checkManager, shopControllers.update);
router.delete('/:shop_id', checkManager, shopControllers._delete)
router.post('/:shop_id', checkAuth, shopControllers.buy)
router.post('/:shop_id/pay', checkManager, shopControllers.pay)

router.get('/:shop_id/isManager', checkAuth, shopControllers.isManager);

module.exports = router;