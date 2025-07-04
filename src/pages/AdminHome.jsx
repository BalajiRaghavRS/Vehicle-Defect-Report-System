// client/src/pages/AdminHome.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import LogoutButton from '../components/LogoutButton'



export default function AdminHome() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    axios.get('/api/reports').then(r => setReports(r.data))
  }, [])

  const del = async (id) => {
    await axios.delete(`/api/reports/${id}`)
    setReports(reports.filter(r => r.id !== id))
  }

  return (
    <div className="auth-page">
      <h2>All Vehicle Defect Reports</h2>
      {reports.map((r, i) => (
        <div key={r.id} className="auth-card" style={{ marginBottom: '1rem' }}>
          <div><b>{i + 1}.</b> Vehicle: {r.vehicle_name}</div>
          <div>Defect: {r.defect}</div>
          <div>From: {r.user_id}</div>
          <br></br>
          <center><button onClick={() => del(r.id)}>Delete</button></center>
        </div>
        
      ))}
      <div>
      
      <LogoutButton role="Admin" />
    </div>
    </div>
  )
}
