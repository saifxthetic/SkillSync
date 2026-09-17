const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["client", "freelancer"],
            required: true
        },

        bio: {
            type: String,
            default: "",
            maxlength: 500
        },

        profileImage: {
            type: String,
            default: ""
        },

        hourlyRate: {
            type: Number,
            min: 0,
            default: 0
        },

        location: {
            type: String,
            default: ""
        },

        experienceLevel: {
            type: String,
            enum: ["beginner", "intermediate", "expert"],
            default: "beginner"
        },

        skills: {
            type: [String],
            default: []
        },

        portfolio: [
            {
                title: {
                    type: String,
                    required: true
                },

                description: {
                    type: String,
                    default: ""
                },

                link: {
                    type: String,
                    default: ""
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;