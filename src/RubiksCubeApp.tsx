import { useState } from 'react'
import { Color, Face } from './utils/types'
import RubiksCube from './utils/cube'
import ButtonComponent from './components/ButtonComponent'

const RubiksCubeApp = () => {
  const [cube] = useState(new RubiksCube())
  const [cubeState, setCubeState] = useState(cube.getFacesState())
  const [moveHistory, setMoveHistory] = useState<string[]>([])

  const handleMove = (move: string) => {
    cube.applyMove(move)
    setCubeState(cube.getFacesState())
    setMoveHistory([...moveHistory, move])
  }

  const handleReset = () => {
    cube.reset()
    setCubeState(cube.getFacesState())
    setMoveHistory([])
  }

  // Color mapping for visual display
  const colorMap: Record<Color, string> = {
    [Color.W]: '#FFFFFF', // White
    [Color.O]: '#FFA500', // Orange
    [Color.G]: '#00FF00', // Green
    [Color.R]: '#FF0000', // Red
    [Color.B]: '#0000FF', // Blue
    [Color.Y]: '#FFFF00', // Yellow
  }

  const renderPiece = (color: Color, size: number = 30) => {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: colorMap[color],
          border: '1px solid #000',
          display: 'inline-block',
        }}
      />
    )
  }

  const renderFace = (face: Face, label: string, size: number = 30) => {
    return (
      <div style={{ margin: '10px', textAlign: 'center' }}>
        <div style={{ marginBottom: '5px' }}>{label}</div>
        <div>
          {face.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
              {row.map((color, colIndex) => (
                <div key={colIndex}>{renderPiece(color, size)}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
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
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ width: 'fit-content' }}>
          {renderFace(cubeState.U, 'Up (U)')}
        </div>

        {/* Middle row: Left, Front, Right, Back */}
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

      <div style={{ marginTop: '20px' }}>
        <h2>Controls</h2>
        <ButtonComponent onMove={handleMove} />

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

      <div style={{ marginTop: '20px' }}>
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
