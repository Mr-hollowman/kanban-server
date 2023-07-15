import express from 'express';
import { createNewBoard, createTask, changeColumn, getTasks, getBoards, updateTask, updateBoard, deleteBoard, deleteTask } from '../controllers/Boards.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/createBoard', verifyToken, createNewBoard)
router.post('/createTask', verifyToken, createTask)
router.post('/modifyColumn', verifyToken, changeColumn)
router.get('/getTasks', verifyToken, getTasks)
router.get('/getBoards', verifyToken, getBoards)
router.post('/updateTask', verifyToken, updateTask)
router.post('/updateBoard', verifyToken, updateBoard)
router.delete('/deleteBoard', verifyToken, deleteBoard)
router.delete('/deleteTask', verifyToken, deleteTask)

export default router