import Boards from "../models/Boards.js"
import Task from "../models/Task.js";
import { createError } from "../utils/createError.js";

export const createNewBoard = async (req, res, next) => {
    const newBoard = new Boards({
        creator: req.user.id,
        title: req.body.title,
        columns: req.body.columns,
        tasks: []
    })
    try {
        const checkExists = await Boards.findOne({ title: req.body.title });
        if (checkExists) return next(createError(400, "Board is already exists"));

        newBoard.save()
        res.status(200).send({ message: "Board has been created" })
    } catch (error) {
        next(createError(501, error.message))
    }
}

export const deleteBoard = async (req, res, next) => {
    try {
        await Boards.findByIdAndDelete({ _id: req.query.boardId }).then(resp=>{
            res.status(200).json({message:"Board deleted successfully"})
        })
    } catch (error) {
        next(createError(501, error.message))
    }
}

export const createTask = async (req, res, next) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            desc: req.body.desc,
            column: req.body.column,
            subTask: req.body.subTask,
            boardId: req.body.boardId
        })
        await newTask.save().then(newT => {
            res.status(200).json(newT)
        }).catch(err => {
            next(createError(400, err.message))
        })

    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        await Task.findByIdAndDelete({ _id: req.query.taskId }).then(()=>{
            res.status(200).json({message:"Task deleted successfully"})
        })
    } catch (error) {
        next(createError(501, error.message))
    }
}

export const changeColumn = async (req, res, next) => {
    try {
        const { taskId, columnToChange } = req.body
        const task = await Task.findByIdAndUpdate({ _id: taskId }, {
            $set: { column: columnToChange }
        }, { new: true })
        res.status(200).json(task)
    } catch (error) {
        next(createError(400, error.message))
    }
}

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.where("boardId").equals(req.query.boardId);
        res.status(200).json(tasks)
    } catch (error) {
        next(createError(400, error.message))
    }
}

export const updateTask = async (req, res, next) => {
    const { _id: id, title, desc, column, boardId, subTask } = req.body
    try {
        const newTask = await Task.findByIdAndUpdate({ _id: id }, { $set: { title, desc, column, boardId, subTask } }, { new: true })
        res.status(200).json(newTask)
    } catch (error) {
        next(createError(400, error.message))
    }
}

export const updateBoard = async (req, res, next) => {
    const { title, columns } = req.body
    try {
        const newTask = await Boards.findByIdAndUpdate({ _id: req.query.boardId }, { $set: { title, columns } }, { new: true })
        res.status(200).json(newTask)
    } catch (error) {
        next(createError(400, error.message))
    }
}