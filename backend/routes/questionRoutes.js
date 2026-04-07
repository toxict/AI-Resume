import express from 'express';
import { getQuestions, addQuestion, getQuestionById, updateQuestion, deleteQuestion } from '../controllers/questionController.js';
import upload from '../middleware/upload.js'; 

const router = express.Router();

router.get('/', getQuestions);
router.get('/:id', getQuestionById);

// Admin Dashboard se 'graphImage' bhej rahe ho isliye yahan wahi field name hai
router.post('/add', upload.single('graphImage'), addQuestion);
router.put('/:id', upload.single('graphImage'), updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;