# Rubik's Cube Simulator

A web-based Rubik's Cube simulator built with React, TypeScript, and Vite. This interactive application allows users to manipulate a virtual Rubik's Cube using standard cube notation.

## Features

- 3D Rubik's Cube visualization using 2D face representations
- Standard Rubik's Cube moves (F, F', R, R', U, U', B, B', L, L', D, D')
- Move history tracking
- Reset functionality
- Intuitive user interface
- Hot reloading during development

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1.  Clone or download the project.

2.  Navigate to the project directory in your terminal.

3.  Run `npm install` to install dependencies.

## Running the Application

### Development Mode

To run the application in development mode with hot reloading:

```bash
npm run dev
```

This will start the development server, typically at `http://localhost:5173`. The page will automatically reload when you make changes to the code.

### Production Mode

To build and run the application in production mode:

```bash
npm start
```

This command will:

1. Build the application for production (optimized and minified)
2. Start a local server to serve the production build

Alternatively, you can:

- Build only: `npm run build`
- Preview the production build: `npm run preview`

## How to Use

1. **Basic Controls**:

   - Use the buttons labeled with cube notations to rotate faces
   - Each face can be rotated clockwise or counter-clockwise
   - The move history is displayed at the bottom of the page

2. **Cube Notation**:

   - F: Front face clockwise
   - F': Front face counter-clockwise
   - R: Right face clockwise
   - R': Right face counter-clockwise
   - U: Up face clockwise
   - U': Up face counter-clockwise
   - B: Back face clockwise
   - B': Back face counter-clockwise
   - L: Left face clockwise
   - L': Left face counter-clockwise
   - D: Down face clockwise
   - D': Down face counter-clockwise

3. **Reset**:
   - Click the "Reset Cube" button to return the cube to its solved state
   - This will also clear the move history

## Project Structure

```
rubiks-cube-frontend/
├── src/
│   ├── utils/
│   │   ├── cube.ts       # Cube logic and state management
│   │   └── types.ts      # TypeScript type definitions
│   ├── RubiksCubeApp.tsx # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── package.json        # Project dependencies and scripts
```

## Development

The project uses:

- React for the UI
- TypeScript for type safety
- Vite for fast development and optimized builds
- ESLint for code linting
- Prettier for code formatting
