import { Question } from '../models/Question.js';

// @desc    Add a new question with Cloudinary image support
// @route   POST /api/questions/add
export const addQuestion = async (req, res) => {
    try {
        const questionData = { ...req.body };

        // 1. Cloudinary image handle karein (req.file.path mein URL hota hai)
        if (req.file) {
            questionData.imageUrl = req.file.path; 
        }

        // 2. Options handling (Frontend se array ya string handle karne ke liye)
        if (req.body.options) {
            if (typeof req.body.options === 'string') {
                try {
                    // Check if it's a JSON array string
                    if (req.body.options.startsWith('[')) {
                        questionData.options = JSON.parse(req.body.options);
                    } else {
                        // Single string ko array mein convert karein
                        questionData.options = [req.body.options];
                    }
                } catch (e) {
                    // Fallback: split by comma if JSON parse fails
                    questionData.options = req.body.options.split(',').map(opt => opt.trim());
                }
            } else if (Array.isArray(req.body.options)) {
                questionData.options = req.body.options;
            }
        }

        const newQuestion = new Question(questionData);
        await newQuestion.save();

        res.status(201).json({ 
            success: true, 
            message: "Question Added Successfully 🚀", 
            newQuestion 
        });
    } catch (error) {
        console.error("Add Question Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            error: error.message 
        });
    }
};

// @desc    Update an existing question
// @route   PUT /api/questions/:id
export const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            updateData.imageUrl = req.file.path;
        }

        if (req.body.options && typeof req.body.options === 'string') {
            try {
                updateData.options = req.body.options.startsWith('[') 
                    ? JSON.parse(req.body.options) 
                    : [req.body.options];
            } catch (e) {
                updateData.options = req.body.options.split(',').map(opt => opt.trim());
            }
        }

        const updated = await Question.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        
        if (!updated) return res.status(404).json({ message: "Question not found" });

        res.status(200).json({ success: true, message: "Question Updated", updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Update Failed", error: error.message });
    }
};

// @desc    Get all questions with optional filters
// @route   GET /api/questions
export const getQuestions = async (req, res) => {
    try {
        const { topic, company } = req.query;
        const filter = {};
        if (topic) filter.topic = topic;
        if (company) filter.company = company;

        // .lean() for faster Vercel execution
        const questions = await Question.find(filter).sort({ createdAt: -1 }).lean();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error: error.message });
    }
};

// @desc    Get a single question
// @route   GET /api/questions/:id
export const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).lean();
        if (!question) return res.status(404).json({ message: "Question not found" });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:id
export const deleteQuestion = async (req, res) => {
    try {
        const deleted = await Question.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Question not found" });
        res.status(200).json({ success: true, message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};