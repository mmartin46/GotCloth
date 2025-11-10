import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UsernameProvider } from './components/UseUsername.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UsernameProvider>
            <App />
        </UsernameProvider>
  </React.StrictMode>,
)
