import express from 'express';
import Farmer from '../models/Farmer.js';
const router = express.Router();

router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

router.post('/farmer', async (req, res) => {
  const { name, phone, location } = req.body;
  try {
    const newFarmer = new Farmer({ name, phone, location });
    await newFarmer.save();
    res.status(201).json(newFarmer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating farmer', error: error.message });
  }
});

export default router;
