import express from 'express';
import { createNewBoard, createTask } from '../controllers/Boards.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/createBoard', verifyToken, createNewBoard)
router.post('/createTask', verifyToken, createTask)

export default router