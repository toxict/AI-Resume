import mongoose from 'mongoose';

const learnSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Learn = mongoose.model('Learn', learnSchema);