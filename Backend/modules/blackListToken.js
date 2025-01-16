import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86_400 // 24 hours
    }
});

const blackListModule = mongoose.model('blackListToken', blackListSchema);

export default blackListModule;