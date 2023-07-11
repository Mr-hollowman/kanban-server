import Users from "../models/Users"
import { createError } from "../utils/createError"

const signup = async (req, res, next) => {
    const user = Users.findOne({ email: req.body.email })
    if (user) return next(createError(400, "User already exists"))
}