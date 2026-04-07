import { GoogleGenerativeAI } from "@google/generative-ai";
import { Question } from "../models/Question.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateQuestions = async (req, res) => {
    const { topic } = req.query;

    if (!topic) {
        return res.status(400).json({ message: "Topic is required" });
    }

    console.log("Generating questions for topic:", topic);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
            Generate 3 unique aptitude questions for the topic: "${topic}".
            Provide exactly one "Easy", one "Medium", and one "Hard" question.
            Return the response in a VALID JSON array format.
            Each object in the array must follow this schema:
            {
                "questionText": "string",
                "options": ["string", "string", "string", "string"],
                "correctAnswer": "string",
                "category": "Aptitude",
                "difficulty": "Easy" | "Medium" | "Hard",
                "topic": "${topic}",
                "solution": "string"
            }
            Ensure correctAnswer is EXACTLY one of the options.
            Do not include any other text or markdown formatting except the JSON array.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean up the response to extract JSON
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        
        const questionsData = JSON.parse(text);

        // Add a flag to indicate these were AI generated (optional, but helpful for UI)
        // Since we are saving to DB, they will look like regular questions.
        
        const savedQuestions = await Question.insertMany(questionsData);

        res.status(200).json(savedQuestions);
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ 
            message: "Failed to generate questions", 
            error: error.message 
        });
    }
};
