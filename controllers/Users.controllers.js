import Users from "../models/Users.js"
import { createError } from "../utils/createError.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (user) return next(createError(400, "User already exists"));

        const salt = bcrypt.genSaltSync(15);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({
            password: hash,
            ...req.body
        })
        await newUser.save();
        const { password, ...others } = newUser._doc
        res.status(200).json({...others})
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
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