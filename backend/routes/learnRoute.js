import express from 'express';
import { 
    addLecture, 
    getLectures, 
    updateLecture, 
    deleteLecture 
} from '../controllers/learnController.js';

const router = express.Router();


router.get('/', getLectures);

router.post('/', addLecture);
router.put('/:id', updateLecture);
router.delete('/:id', deleteLecture);

export default router;