import Boards from "../models/Boards.js"
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