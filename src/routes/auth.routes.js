import express from 'express';

import authControllers from '../controllers/auth.controllers';
import checkAuth from '../middlewares/checkAuth.middleware';
import { validate, registerRules } from '../middlewares/validate.middleware';

const router = express.Router();

router.post('/register', registerRules(), validate, authControllers.register);
router.post('/login', authControllers.login);
router.get('/me', checkAuth, authControllers.me);

module.exports = router;