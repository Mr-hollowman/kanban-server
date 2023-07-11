import express from 'express';
import { signup } from '../controllers/Users.controllers';

const router = express.Router();

router.post('/signup',signup);


export default router