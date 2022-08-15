import express from 'express';

import userControllers from '../controllers/users.controllers';
import checkAuth from '../middlewares/checkAuth.middleware';

const router = express.Router();

router.post('/login', userControllers.login);
router.post('/register', userControllers.register);
router.get('/me', checkAuth, userControllers.getMe);

module.exports = router;
