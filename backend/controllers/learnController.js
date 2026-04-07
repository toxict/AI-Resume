import { Learn } from '../models/learnModel.js';

// @desc    Add a new video lecture
// @route   POST /api/learn
export const addLecture = async (req, res) => {
    try {
        const { topic, category, videoUrl, description, duration } = req.body;

        // Validation check for Vercel stability
        if (!topic || !videoUrl) {
            return res.status(400).json({ message: "Topic and Video URL are required" });
        }

        const lecture = await Learn.create({
            topic,
            category,
            videoUrl,
            description,
            duration
        });

        res.status(201).json(lecture);
    } catch (error) {
        console.error("Add Lecture Error:", error.message);
        res.status(500).json({ message: "Server Error: Could not add lecture", error: error.message });
    }
};

// @desc    Get all video lectures
// @route   GET /api/learn
export const getLectures = async (req, res) => {
    try {
        // Use lean() for faster performance in serverless functions
        const lectures = await Learn.find({}).lean().sort({ createdAt: -1 });
        res.status(200).json(lectures);
    } catch (error) {
        console.error("Get Lectures Error:", error.message);
        res.status(500).json({ message: "Server Error: Could not fetch lectures", error: error.message });
    }
};

// @desc    Update a lecture
// @route   PUT /api/learn/:id
export const updateLecture = async (req, res) => {
    try {
        const updatedLecture = await Learn.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // runValidators ensures the update follows schema rules
        );

        if (!updatedLecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        res.status(200).json(updatedLecture);
    } catch (error) {
        console.error("Update Lecture Error:", error.message);
        res.status(400).json({ message: "Invalid update data", error: error.message });
    }
};

// @desc    Delete a lecture
// @route   DELETE /api/learn/:id
export const deleteLecture = async (req, res) => {
    try {
        const deletedLecture = await Learn.findByIdAndDelete(req.params.id);

        if (!deletedLecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        res.status(200).json({ message: "Lecture deleted successfully" });
    } catch (error) {
        console.error("Delete Lecture Error:", error.message);
        res.status(500).json({ message: "Could not delete lecture", error: error.message });
    }
};