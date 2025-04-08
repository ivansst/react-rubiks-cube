import { useState } from 'react'
import { Color, Face } from './utils/types'
import RubiksCube from './utils/cube'
import MoveControls from './components/ButtonComponent'

const RubiksCubeApp = () => {
  const [cube] = useState(new RubiksCube())
  const [cubeState, setCubeState] = useState(cube.getFacesState())
  const [moveHistory, setMoveHistory] = useState<string[]>([])

  // Apply a move and update the cube state
  const handleMove = (move: string) => {
    cube.applyMove(move)
    setCubeState(cube.getFacesState())
    setMoveHistory((prev) => [...prev, move])
  }

  // Reset the cube to its initial state
  const handleReset = () => {
    cube.reset()
    setCubeState(cube.getFacesState())
    setMoveHistory([])
  }

  // Colors for each face
  const faceColors = {
    [Color.W]: '#FFFFFF', // White
    [Color.O]: '#FFA500', // Orange
    [Color.G]: '#00FF00', // Green
    [Color.R]: '#FF0000', // Red
    [Color.B]: '#0000FF', // Blue
    [Color.Y]: '#FFFF00', // Yellow
  }

  // Render a single square of the cube
  const renderSquare = (color: Color, size: number = 30) => (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: faceColors[color],
        border: '1px solid #000',
        display: 'inline-block',
      }}
    />
  )

  // Render a full face of the cube
  const renderFace = (face: Face, label: string, size: number = 30) => (
    <div style={{ margin: '10px', textAlign: 'center' }}>
      <div style={{ marginBottom: '5px' }}>{label}</div>
      <div>
        {face.map((row, i) => (
          <div key={i} style={{ display: 'flex' }}>
            {row.map((color, j) => (
              <div key={j}>{renderSquare(color, size)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div
      className="cube-app"
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Rubik's Cube Simulator
      </h1>

      <div
        className="cube-display"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Up face */}
        <div style={{ width: 'fit-content' }}>
          {renderFace(cubeState.U, 'Up (U)')}
        </div>

        {/* Middle layer */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {renderFace(cubeState.L, 'Left (L)')}
          {renderFace(cubeState.F, 'Front (F)')}
          {renderFace(cubeState.R, 'Right (R)')}
          {renderFace(cubeState.B, 'Back (B)')}
        </div>

        {/* Down face */}
        <div style={{ width: 'fit-content' }}>
          {renderFace(cubeState.D, 'Down (D)')}
        </div>
      </div>

      <div className="controls" style={{ marginTop: '20px' }}>
        <h2>Controls</h2>
        <MoveControls onMove={handleMove} />

        <button
          onClick={handleReset}
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Reset Cube
        </button>
      </div>

      <div className="history" style={{ marginTop: '20px' }}>
        <h2>Move History</h2>
        <div
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            minHeight: '50px',
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            fontFamily: 'monospace',
          }}
        >
          {moveHistory.length > 0 ? moveHistory.join(' ') : 'No moves yet'}
        </div>
      </div>
    </div>
  )
}

export default RubiksCubeApp
