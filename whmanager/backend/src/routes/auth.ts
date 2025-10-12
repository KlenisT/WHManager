import express from 'express';
import {
  register,
  login,
  getProfile,
  getUsers
} from '../controllers/authController';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (you'll need to add middleware later)
router.get('/profile', getProfile);
router.get('/users', getUsers);

// Health check
router.get('/status', (req, res) => {
  res.json({ message: 'Auth service is running' });
});

export default router;
