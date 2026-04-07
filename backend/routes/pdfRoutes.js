import express from 'express';
import { uploadPdfFile, getPdfs, deletePdf, getPdfById, updatePdf } from '../controllers/pdfController.js';
import upload from '../middleware/upload.js'; // Universal middleware use kar rahe hain

const router = express.Router();

// 'pdfFile' field name frontend se match hona chahiye
router.post('/upload', upload.single('pdfFile'), uploadPdfFile);
router.get('/', getPdfs);
router.get('/:id', getPdfById); // Naya route
router.put('/:id', upload.single('pdfFile'), updatePdf);
router.delete('/:id', deletePdf);

export default router;