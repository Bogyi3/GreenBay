import express from 'express';
import {
  registrationController,
  sessionsController,
  itemsController,
} from '../controllers';

import authHandler from '../middlewares/auth-handler';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/registration', registrationController.post);
router.post('/sessions', sessionsController.post);
router.post('/item/new', itemsController.createItem);
router.get('/item/sellable/all', itemsController.getAllSellableItems);

router.use(authHandler);

router.get('/item/all', itemsController.getAllItems);
router.get('/item/:itemId', itemsController.getSingleItem);

export default router;
