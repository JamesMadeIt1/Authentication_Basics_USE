const userModel = require('../Models/user.model');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res, next) => {
    const registerSchema = Joi.object({
        Name: Joi.string().min(2).required(),
        Email: Joi.string().email().required(),
        Password: Joi.string().min(6).required()
    });

    try {
        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { Name, Email, Password } = req.body;

        const existingUser = await userModel.findOne({ Email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newUser = new userModel({
            Name,
            Email,
            Password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({
            message: 'User successfully registered'
        });
    } catch (error) {
        next(error);
    }
};

const logInUser = async (req, res, next) => {
    const logInSchema = Joi.object({
        Email: Joi.string().email().required(),
        Password: Joi.string().min(6).required()
    });

    try {
        const { error } = logInSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { Email, Password } = req.body;
        const user = await userModel.findOne({ Email });

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, name: user.Name },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: 'User successfully logged in',
            userId: user._id,
            userName: user.Name,
            userEmail: user.Email,
            token
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    logInUser,
    registerUser
};