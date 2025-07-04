import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function LogoutButton({ role }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, {
        withCredentials: true
      })
      // Navigate back to the login page based on role
      navigate(role === 'Admin' ? '/admin' : '/user')
    } catch (err) {
      alert('Logout failed: ' + err.message)
    }
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}
