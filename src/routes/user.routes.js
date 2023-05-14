import express from 'express';

import userController from '../controllers/user.controllers';
import checkAuth from '../middlewares/checkAuth.middleware';

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/all', userController.getAllUsers);
router.put('/:id/add', userController.addMoney)
router.put('/toggleHide', checkAuth, userController.toogleHide)

module.exports = router;