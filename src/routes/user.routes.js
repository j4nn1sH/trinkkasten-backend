import express from 'express';

import userController from '../controllers/user.controllers';
import historyController from '../controllers/history.controllers';
import checkAuth from '../middlewares/checkAuth.middleware';

const router = express.Router();

router.get('/balances', checkAuth, userController.getBalances);
router.get('/history/:kitchen', checkAuth, historyController.getUserHistory)

module.exports = router;