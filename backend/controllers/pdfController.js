import { Pdf } from '../models/PdfModel.js';

export const uploadPdfFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No PDF file provided" });
        }

        const { title, company, category } = req.body;

        const newPdf = new Pdf({
            title,
            company,
            pdfUrl: req.file.path, // Cloudinary gives back the URL here
            category
        });

        await newPdf.save();
        res.status(201).json({
            success: true,
            message: "Company-wise PDF added successfully!",
            newPdf
        });
    } catch (error) {
        console.error("PDF Upload Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPdfs = async (req, res) => {
    try {
        const pdfs = await Pdf.find().sort({ createdAt: -1 });
        res.status(200).json(pdfs);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deletePdf = async (req, res) => {
    try {
        await Pdf.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "PDF Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get a single PDF by ID
// @route   GET /api/pdfs/:id
export const getPdfById = async (req, res) => {
    try {
        const pdf = await Pdf.findById(req.params.id).lean();

        if (!pdf) {
            return res.status(404).json({ success: false, message: "PDF not found!" });
        }

        res.status(200).json(pdf);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update PDF details or the file itself
// @route   PUT /api/pdfs/:id
export const updatePdf = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Agar admin ne nayi file select ki hai, toh URL update karo
        if (req.file) {
            updateData.pdfUrl = req.file.path;
        }

        const updatedPdf = await Pdf.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedPdf) {
            return res.status(404).json({ success: false, message: "PDF not found!" });
        }

        res.status(200).json({
            success: true,
            message: "PDF Updated Successfully!",
            updatedPdf
        });
    } catch (error) {
        console.error("Update PDF Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};