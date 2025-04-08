import React from 'react'

interface ButtonComponentProps {
  onMove: (move: string) => void
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ onMove }) => {
  const moveTypes = ['F', 'R', 'U', 'B', 'L', 'D'] as const

  const moveNames: Record<(typeof moveTypes)[number], string> = {
    F: 'Front',
    B: 'Back',
    L: 'Left',
    R: 'Right',
    U: 'Up',
    D: 'Down',
  }

  const moves = moveTypes
    .map((move) => [
      { notation: move, description: `${moveNames[move]} Face Clockwise` },
      {
        notation: `${move}'`,
        description: `${moveNames[move]} Face Counter Clockwise`,
      },
    ])
    .flat()

  const buttonStyle = {
    padding: '12px 16px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '60px',
    margin: '4px',
  }

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 70px)',
          gridTemplateRows: 'repeat(2, auto)',
          gap: '4px',
          justifyContent: 'center',
          marginBottom: '30px',
        }}
      >
        {moveTypes.map((move) => (
          <button key={move} style={buttonStyle} onClick={() => onMove(move)}>
            {move}
          </button>
        ))}
        {moveTypes.map((move) => (
          <button
            key={`${move}'`}
            style={buttonStyle}
            onClick={() => onMove(`${move}'`)}
          >
            {`${move}'`}
          </button>
        ))}
      </div>

      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Move Legend</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
          }}
        >
          {moves.map((move) => (
            <div
              key={move.notation}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <span
                style={{
                  fontWeight: 'bold',
                  minWidth: '30px',
                  padding: '4px 8px',
                  backgroundColor: '#e9ecef',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                {move.notation}
              </span>
              <span>{move.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ButtonComponent
