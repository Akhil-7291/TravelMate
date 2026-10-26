const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Allow frontend to communicate with backend
app.use(cors());
app.use(express.json());

// Sample travel plans
let trips = [
  { id: 1, destination: 'Paris', budget: 500 },
  { id: 2, destination: 'London', budget: 700 }
];

// GET API - View all trips
app.get('/api/trips', (req, res) => {
  res.json(trips);
});

// POST API - Add a new trip
app.post('/api/trips', (req, res) => {
  const { destination, budget } = req.body;

  if (
    typeof destination !== 'string' ||
    !destination.trim() ||
    !Number.isFinite(Number(budget)) ||
    budget === '' ||
    Number(budget) < 0
  ) {
    return res.status(400).json({
      error: 'Valid destination and budget are required'
    });
  }

  const newTrip = {
    id: Date.now(),
    destination: destination.trim(),
    budget: Number(budget)
  };

  trips.push(newTrip);
  res.status(201).json(newTrip);
});

// Start backend server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});