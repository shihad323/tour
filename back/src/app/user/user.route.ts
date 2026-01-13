import { Router } from 'express';
import * as userController from './user.controller';
import path from 'path';
import multer from 'multer';

// setup multer storage for user pictures
const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/\s+/g, '_');
    cb(null, `${Date.now()}-${safe}`);
  }
});
const upload = multer({ storage, limits: { files: 1 } });

const router = Router();

// Auth routes
router.post('/register', upload.single('picture'), async (req, res) => {
  try {
    const body = req.body;
    if (req.file) {
      const origin = `${req.protocol}://${req.get('host')}`;
      body.picture = `${origin}/uploads/${req.file.filename}`;
    }
    const user = await userController.registerUser(body as any);
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userController.loginUser(email, password);
    res.status(200).json({ success: true, data: { user, token } });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// User routes
router.get('/', async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const result = await userController.getAllUsers(Number(skip), Number(limit));
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userController.getUserById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await userController.updateUser(req.params.id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await userController.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
});

export default router;
