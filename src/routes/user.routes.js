import express from 'express';

import userController from '../controllers/user.controllers';
import historyController from '../controllers/history.controllers';
import checkAuth from '../middlewares/checkAuth.middleware';

const router = express.Router();

router.get('/balances', checkAuth, userController.getBalanceList);
router.get('/:shop_id/history', checkAuth, historyController.getHistory)
router.put('/:shop_id/toggleHide', checkAuth, userController.toggleHide)

module.exports = router;