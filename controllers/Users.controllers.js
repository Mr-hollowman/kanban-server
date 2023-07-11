import Users from "../models/Users"
import { createError } from "../utils/createError";
import bcrypt from 'bcryptjs';

export const signup = async (req, res, next) => {
    try {
        const user = Users.findOne({ email: req.body.email })
        if (user) return next(createError(400, "User already exists"));

        const salt = bcrypt.genSaltSync(15);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({
            password: hash,
            ...req.body
        })
        await newUser.save();
        res.status(200).send({ message: "User has been created" })
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = Users.findOne({ email: req.body.email })
        if (!user) return next(createError(404, "User not found"));

        const decryptPassword = bcrypt.compare(req.body.password, user.password)
        if (!decryptPassword) return next(createError(400, "wrong credentials"))

        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...others } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(others)
    } catch (error) {
        next(error)
    }
}