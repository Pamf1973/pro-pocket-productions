import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    fileFilter: (_req, file, cb) => {
        const allowed = [
            'text/plain',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/octet-stream', // fdx / fountain come through as this
        ];
        if (allowed.includes(file.mimetype) || file.originalname.match(/\.(txt|fdx|fountain|pdf|docx)$/i)) {
            cb(null, true);
        } else {
            cb(new Error(`Unsupported file type: ${file.mimetype}`));
        }
    },
});

// POST /api/parse/script — extract plain text from PDF, DOCX, or text-based screenplay files
router.post('/script', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const { originalname, buffer, mimetype } = req.file;
        const ext = originalname.split('.').pop()?.toLowerCase() ?? '';
        let text = '';

        if (ext === 'pdf' || mimetype === 'application/pdf') {
            const data = await pdfParse(buffer);
            text = data.text;
        } else if (ext === 'docx' || mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
        } else {
            // txt, fdx, fountain — all UTF-8 text
            text = buffer.toString('utf-8');
        }

        if (!text.trim()) {
            res.status(422).json({ error: 'Could not extract any text from this file. Make sure the document contains selectable text (not scanned images).' });
            return;
        }

        res.json({ text: text.trim() });
    } catch (err) {
        next(err);
    }
});

export default router;
