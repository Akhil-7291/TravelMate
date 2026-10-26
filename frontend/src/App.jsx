import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [trips, setTrips] = useState([]);
  useEffect(() => {
  fetch('http://localhost:5000/api/trips')
    .then((response) => response.json())
    .then((data) => setTrips(data))
    .catch((error) => {
      console.error('Error fetching trips:', error);
    });
}, []);

  async function addTrip(e) {
  e.preventDefault();

  if (!destination.trim() || budget === '' || Number(budget) < 0) {
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: destination.trim(),
        budget: Number(budget),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add trip');
    }

    const newTrip = await response.json();

    setTrips((previousTrips) => [...previousTrips, newTrip]);
    setDestination('');
    setBudget('');
  } catch (error) {
    console.error('Error adding trip:', error);
    alert('Unable to add trip. Please check your backend.');
  }
}
  return (
    <div className="app">
      <h1>✈️ TravelMate</h1>
      <p>Plan your next adventure!</p>

      <h2>Add a New Trip</h2>

      <form onSubmit={addTrip}>
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          min="0"
          required
        />

        <button type="submit">Add Trip</button>
      </form>

      <h2>My Travel Plans</h2>

      {trips.length === 0 ? (
        <p>No trips added yet.</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              {trip.destination} — Budget: {trip.budget}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;