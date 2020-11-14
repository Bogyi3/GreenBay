import express from 'express';
import {
  helloController,
  registrationController,
  sessionsController,
} from '../controllers';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.post('/registration', registrationController.post);
router.post('/sessions', sessionsController.post);

export default router;
