import express from 'express';
import checkAuth from '../middlewares/checkAuth.middleware';

// Import all routes
import authRoutes from './auth.routes';
//import ... from './...'

const router = express.Router();

router.use('/auth', authRoutes);
//router.use('...', ...)

module.exports = router;
