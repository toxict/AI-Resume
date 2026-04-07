import express from 'express';
import { generateQuestions } from '../controllers/geminiController.js';

const router = express.Router();

router.get('/generate', generateQuestions);

export default router;
