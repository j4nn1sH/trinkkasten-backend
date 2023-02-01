import express from 'express';

import userControllers from '../controllers/users.controllers';
import checkAuth from '../middlewares/checkAuth.middleware';

const router = express.Router();

router.put('/editDescription', checkAuth, userControllers.editDescription);

module.exports = router;