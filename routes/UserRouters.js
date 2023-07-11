import express from 'express';
import { signin, signup } from '../controllers/Users.controllers';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin)


export default router