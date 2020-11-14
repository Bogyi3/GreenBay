import express from 'express';
import {
  helloController,
  registrationController,
  sessionsController,
  itemsController,
} from '../controllers';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.post('/registration', registrationController.post);
router.post('/sessions', sessionsController.post);

router.get('/item/all', itemsController.getAllItems);
router.get('/item/sellable/all', itemsController.getAllSellableItems);
router.get('/item/:itemId', itemsController.getSingleItem);
router.post('/item/new', itemsController.createItem);

export default router;
