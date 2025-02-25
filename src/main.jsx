import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './assets/loginPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage/>
  </StrictMode>,
)
