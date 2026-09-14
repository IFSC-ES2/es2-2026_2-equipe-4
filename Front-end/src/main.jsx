import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Enviar from './Enviar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Enviar />
  </StrictMode>,
)
