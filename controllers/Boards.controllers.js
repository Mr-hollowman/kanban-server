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
        next(error)
    }
}

export const createTask = async (req, res, next) => {
    const newTask = new Task({
        title: req.body.title,
        desc: req.body.desc,
        column: req.body.column,
        subTask: req.body.subTask
    })
    try {
        const getBoard = await Boards.findByIdAndUpdate({ _id: req.body.boardId }, {
            $push: { tasks: newTask }
        }, { new: true })

        res.status(200).json(getBoard)
    } catch (error) {
        next(error)
    }
}