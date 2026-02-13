import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from './Context/SnackbarContext.jsx'

import { ThemeProvider } from './Context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ThemeProvider>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </ThemeProvider>
  // </StrictMode>,
)
