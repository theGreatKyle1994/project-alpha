# Project Alpha

Welcome to Project Alpha!

## Current Version: v0.1.3

### Movement Rework

#### New Features

- Player is now bound to the screen inside a inner box
- Map scrolling with player movement
- All entities will scroll with map movement

#### Known Bugs

- Player sometimes get stuck in walls
- Diagonal player movement makes the player much faster when touching inner bounding box
- Player speed with map movement isn't consistent

## Requirements

This project requires a classic MERN setup to use efficiently.
Make sure MongoDB is installed to make use of the backend tools.
Pulling node_modules is needed to get all required dependencies.
Run this in terminal on both ./client and ./server folders:

```
npm install
```

# Getting Started

## Running the frontend/backend

To start the frontend, run in terminal at /client:

```
npm run dev
```

To start the backend, run in terminal at /server:

```
nodemon server.js
```
