import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RubiksCubeApp from './RubiksCubeApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RubiksCubeApp />
  </StrictMode>
)
