import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    topic: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    imageUrl: { 
        type: String, 
        default: null 
    },
    company: {
        type: String,
    },
    // description: {
    //     type: String,
    //     required: true
    // },
    // videoUrl: {
    //     type: String,
    //     required: true
    // },
    // duration: {
    //     type: String,
    // }

}, { timestamps: true });

export const Question = mongoose.model('Question', questionSchema);