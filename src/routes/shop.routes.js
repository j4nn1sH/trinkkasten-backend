import express from 'express';

import shopControllers from '../controllers/shop.controllers';
import authControllers from '../controllers/auth.controllers';

const router = express.Router();

router.get('/', shopControllers.getBeverages);
router.post('/buy', shopControllers.buyBeverages);
router.get('/users', authControllers.getAllUsers);
router.post('/users/toggleHide', shopControllers.toggleHide);

module.exports = router;