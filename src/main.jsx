import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'  // 👈 import

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider> {/* 👈 wrap entire app */}
      <App />
    </AuthProvider>
  </BrowserRouter>
)

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import axios from 'axios'

// // ✅ This makes sure axios sends cookies with every request
// axios.defaults.withCredentials = true

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
