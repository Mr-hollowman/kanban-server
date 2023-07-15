import express from 'express';
import { createNewBoard, createTask, changeColumn, getTasks, updateTask, updateBoard, deleteBoard } from '../controllers/Boards.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/createBoard', verifyToken, createNewBoard)
router.post('/createTask', verifyToken, createTask)
router.post('/modifyColumn', verifyToken, changeColumn)
router.get('/getTasks', verifyToken, getTasks)
router.post('/updateTask', verifyToken, updateTask)
router.post('/updateBoard', verifyToken, updateBoard)
router.delete('/deleteBoard', verifyToken, deleteBoard)

export default router