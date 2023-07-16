import { format } from "date-fns";
import { createError } from "./createError.js";
import logs from "../models/log.js";

export const logEvent = async (req, res, next) => {
    try {
        const newLog = new logs({
            user: req.user.id,
            type: req.body.type,
            action: req.body.action,
            time: format(new Date(), "dd/MM/yyyy\thh:mm:ss")
        })
        await newLog.save()
        res.status(200).json({message:"event logged"})
    } catch (error) {
        next(createError(501, error.message))
    }
}