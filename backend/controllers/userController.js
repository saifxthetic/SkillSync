const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { registerSchema, loginSchema } = require("../validators/userValidator");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
    try {
        // Validate incoming data
        const { error, value } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        // Check whether email already exists
        const existingUser = await User.findOne({
            email: value.email
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email is already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(value.password, 10);

        // Create user
        const user = await User.create({
            ...value,
            password: hashedPassword
        });

        // Don't send password back to client
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "User registered successfully",
            user: userResponse
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        // Validate login data
        const { error, value } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        // Find user by email
        const user = await User.findOne({
            email: value.email
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            value.password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const clientTest = (req, res) => {
    res.status(200).json({
        message: "Welcome client! You can access this route.",
        user: req.user
    });
};

const freelancerTest = (req, res) => {
    res.status(200).json({
        message: "Welcome freelancer! You can access this route.",
        user: req.user
    });
};

module.exports = {
    createUser,
    loginUser,
     getCurrentUser, clientTest, freelancerTest
};