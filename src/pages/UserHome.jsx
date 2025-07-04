// client/src/pages/UserHome.jsx
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import LogoutButton from '../components/LogoutButton'



export default function UserHome() {
  const { session } = useAuth()
  const [form, setForm] = useState({ vehicleName: '', defect: '' })

  const submit = async (e) => {
    e.preventDefault()
    await axios.post('/api/reports', {
      ...form,
      userId: session.userId
    })
    alert('Report submitted!')
    setForm({ vehicleName: '', defect: '' })
  }

  return (
    <div className="auth-page">
      <h2>Submit a Vehicle Defect Report</h2>
      <form className="auth-card" onSubmit={submit}>
        <input
          placeholder="Vehicle Name"
          value={form.vehicleName}
          onChange={(e) => setForm({ ...form, vehicleName: e.target.value })}
          required
        />
        <textarea
          placeholder="Describe the defect"
          value={form.defect}
          onChange={(e) => setForm({ ...form, defect: e.target.value })}
          required
        />
        <button type="submit">Submit Report</button>
       
            
      </form>
       <div>
      <h2>Welcome User</h2>
      {/* Your vehicle report form here */}
      <LogoutButton role="User" />
    </div>
    </div>
  )
}





  