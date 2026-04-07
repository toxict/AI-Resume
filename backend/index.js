import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import questionRoutes from './routes/questionRoutes.js';
import learnRoutes from './routes/learnRoute.js';
import pdfRoutes from './routes/pdfRoutes.js';
import geminiRoutes from './routes/geminiRoutes.js';

dotenv.config();

const app = express();

// 1. MIDDLEWARES
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// 2. DATABASE CONNECTION (Serverless Connection Pooling)
let isConnected = false; 

const connectDB = async () => {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000,
        });
        isConnected = db.connections[0].readyState;
        console.log("MongoDB Connected for ZenCode project");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};

// 3. APPLY CONNECTION MIDDLEWARE
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// 4. ROUTES
app.use('/api/questions', questionRoutes);
app.use('/api/learn', learnRoutes);
app.use('/api/pdfs', pdfRoutes);
app.use('/api/gemini', geminiRoutes);


app.get("/", (req, res) => {
    res.send("ZenCode Test Aptitude Backend is Live on Vercel!");
});

// 5. ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: process.env.NODE_ENV === 'production' ? "Server Error" : err.message
    });
});

// 6. ADAPTIVE EXPORT (Required for Vercel)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Local server running on port ${PORT}`));
}

export default app;