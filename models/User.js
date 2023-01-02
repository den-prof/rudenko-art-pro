import mongoose from "mongoose"


const UserSchems = new mongoose.Schema(
    {
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchems)