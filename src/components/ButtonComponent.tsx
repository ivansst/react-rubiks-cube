import React from 'react'

type MoveButtonProps = {
  onMove: (move: string) => void
}

const MoveControls = ({ onMove }: MoveButtonProps) => {
  // Standard Rubik's cube move notation
  const moves = ['F', 'R', 'U', 'B', 'L', 'D'] as const

  // Map move letters to their full names
  const moveDescriptions = {
    F: 'Front',
    B: 'Back',
    L: 'Left',
    R: 'Right',
    U: 'Up',
    D: 'Down',
  } as const

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
      {/* Move buttons in a 2x6 grid */}
      <div
        className="move-buttons"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 70px)',
          gridTemplateRows: 'repeat(2, auto)',
          gap: '4px',
          justifyContent: 'center',
          marginBottom: '30px',
        }}
      >
        {/* Regular moves (clockwise) */}
        {moves.map((move) => (
          <button key={move} style={buttonStyle} onClick={() => onMove(move)}>
            {move}
          </button>
        ))}

        {/* Counter-clockwise moves */}
        {moves.map((move) => (
          <button
            key={`${move}'`}
            style={buttonStyle}
            onClick={() => onMove(`${move}'`)}
          >
            {`${move}'`}
          </button>
        ))}
      </div>

      {/* Help section explaining the moves */}
      <div
        className="move-help"
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>How to Move</h3>
        <div
          className="move-explanations"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
          }}
        >
          {moves.map((move) => (
            <React.Fragment key={move}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <code
                  style={{
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '4px',
                  }}
                >
                  {move}
                </code>
                <span>{moveDescriptions[move]} face clockwise</span>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <code
                  style={{
                    fontWeight: 'bold',
                    padding: '4px 8px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '4px',
                  }}
                >
                  {`${move}'`}
                </code>
                <span>{moveDescriptions[move]} face counter-clockwise</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MoveControls
