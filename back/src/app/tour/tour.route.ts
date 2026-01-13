import { Router } from 'express';
import path from 'path';
import multer from 'multer';
import * as tourController from './tour.controller';

const router = Router();

// multer storage config: uploads stored in back/uploads
const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/\s+/g, '_');
    cb(null, `${Date.now()}-${safe}`);
  }
});
const upload = multer({ storage, limits: { files: 5 } });

// Tour Type routes
router.post('/types', async (req, res) => {
  try {
    const tourType = await tourController.createTourType(req.body);
    res.status(201).json({ success: true, data: tourType });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/types', async (req, res) => {
  try {
    const tourTypes = await tourController.getAllTourTypes();
    res.status(200).json({ success: true, data: tourTypes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Tour routes
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const body = req.body;
    const files = (req.files as Express.Multer.File[] | undefined) || [];
    // enforce exactly 5 images uploaded
    if (files.length !== 5) {
      return res.status(400).json({ success: false, message: 'Please upload exactly 5 images for the tour' });
    }
    const origin = `${req.protocol}://${req.get('host')}`;
    const images = files.map(f => `${origin}/uploads/${f.filename}`);
    // parse incoming array-like fields (they may be JSON strings or newline/comma separated)
    const safeParse = (val: any) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === 'string') {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {
          // not JSON; fallthrough to split
        }
        // split on newlines or commas
        return val.split(/\r?\n|,/).map((s: string) => s.trim()).filter(Boolean);
      }
      return [];
    };

    const tourData = {
      ...body,
      images,
      included: safeParse(body.included),
      excluded: safeParse(body.excluded),
      amenities: safeParse(body.amenities),
      tourPlan: safeParse(body.tourPlan),
    };
    const tour = await tourController.createTour(tourData as any);
    res.status(201).json({ success: true, data: tour });
  } catch (error: any) {
    console.error('Create tour error:', error);
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const details: any = {};
      Object.keys(error.errors || {}).forEach((key) => {
        details[key] = error.errors[key].message;
      });
      return res.status(400).json({ success: false, message: error.message, errors: details });
    }
    // Handle duplicate key (unique) errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0];
      return res.status(400).json({ success: false, message: `Duplicate value for field ${field}` });
    }
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const result = await tourController.getAllTours(Number(skip), Number(limit));
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { q, skip = 0, limit = 10 } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }
    const result = await tourController.searchTours(String(q), Number(skip), Number(limit));
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/slug/:slug', async (req, res) => {
  try {
    const tour = await tourController.getTourBySlug(req.params.slug);
    res.status(200).json({ success: true, data: tour });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tour = await tourController.getTourById(req.params.id);
    res.status(200).json({ success: true, data: tour });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tour = await tourController.updateTour(req.params.id, req.body);
    res.status(200).json({ success: true, data: tour });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await tourController.deleteTour(req.params.id);
    res.status(200).json({ success: true, message: 'Tour deleted successfully' });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
});

export default router;
