import express from 'express';
import {
  registrationController,
  sessionsController,
  itemsController,
  transactionController,
  usersController,
} from '../controllers';

import authHandler from '../middlewares/auth-handler';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/registration', registrationController.post);
router.post('/sessions', sessionsController.post);

router.use(authHandler);
router.post('/item/new', itemsController.createItem);
router.get('/item/sellable/all', itemsController.getAllSellableItems);
router.get('/item/:itemId', itemsController.getSingleItem);
router.get('/item/all', itemsController.getAllItems);
router.get('/user/:username', usersController.getUserByUsername);
router.put('/transaction', transactionController.buyItem);

// admin authorization handler
router.get('/user/all', usersController.getAllUsers);

export default router;
