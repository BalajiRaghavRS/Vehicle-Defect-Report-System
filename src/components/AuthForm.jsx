import { useState } from 'react'
import axios from 'axios'
import './AuthForm.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'  // 👈 import context to store login info

export default function AuthForm({ role }) {
  const [mode, setMode] = useState('login') // login | signup
  const [form, setForm] = useState({ email: '', password: '' })
  const endpoint = mode === 'login' ? 'login' : 'signup'

  const { setSession } = useAuth()  // 👈 sets user session (optional)
  const nav = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`/api/auth/${endpoint}`, {
        ...form,
        role
      })

      // save session (userId and role)
      setSession({ userId: data.userId, role })

      // redirect to proper home page
      if (role === 'Admin') {
        nav('/admin/home')
      } else {
        nav('/user/home')
      }

    } catch (err) {
      alert(`Error: ${err.response?.data?.error || err.message}`)
    }
  }

  return (
    <div className="auth-card">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>
      <p className="toggle">
        {mode === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
        <span onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'Create one' : 'Sign in'}
        </span>
      </p>
    </div>
  )
}
