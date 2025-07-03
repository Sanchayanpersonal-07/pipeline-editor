import React from 'react'
import ReactDOM from 'react-dom/client'
import AppWrapper from './App.tsx' // Ensure this points to App.tsx
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)