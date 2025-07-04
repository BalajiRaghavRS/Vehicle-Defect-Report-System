// client/src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import UserHome from './pages/UserHome'
import AdminHome from './pages/AdminHome'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<AuthPage role="User" />} />
      <Route path="/admin" element={<AuthPage role="Admin" />} />
      <Route path="/user/home" element={<UserHome />} />
      <Route path="/admin/home" element={<AdminHome />} />
    </Routes>
  )
}
