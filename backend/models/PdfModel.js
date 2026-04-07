import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    company: { 
        type: String, 
        required: true 
    },
    pdfUrl: { 
        type: String, 
        required: true 
    }, 
    category: { 
        type: String, 
        default: 'Mock Test' 
    }
}, { timestamps: true });

export const Pdf = mongoose.model('Pdf', pdfSchema);