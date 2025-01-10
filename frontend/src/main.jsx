import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import App from './App.jsx'
import Schedule from './pages/Schedule.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/schedule" element={<Schedule/>} />
      </Routes>
    </BrowserRouter>
    </>
  </StrictMode>,
)
