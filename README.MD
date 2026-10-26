# TravelMate – Full-Stack Trip Management System

TravelMate is a simple full-stack web application for creating and viewing travel plans with estimated budgets.

## Technologies Used
- React.js and Vite – Frontend
- Node.js and Express.js – Backend
- REST APIs – Frontend and backend communication
- JavaScript and CSS

## Features
1. View travel plans using a GET API.
2. Add new travel plans using a POST API.

## How to Run

Prerequisite: Node.js and npm installed.

### Backend
```bash
cd backend
npm install
node server.js
```
Backend: http://localhost:5000

### Frontend
Open a second terminal from the project root:
```bash
cd frontend
npm install
npm run dev
```
Open the local URL displayed by Vite, usually http://localhost:5173/.

## API Endpoints
- GET /api/trips – Retrieve travel plans.
- POST /api/trips – Create a travel plan.

POST JSON example:
```json
{
  "destination": "Hyderabad",
  "budget": 1000
}
```

## Note
Travel plans are stored in backend memory and reset when the server restarts.