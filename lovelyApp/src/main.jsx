import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Auth from './components/Auth.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './services/store.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>
)
