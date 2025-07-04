import { useNavigate } from 'react-router-dom'
import './Home.css'

const Card = ({ role, navigate }) => (
  <div
    className="role-card"
    onClick={() => navigate(`/${role.toLowerCase()}`)}
  >
    {role}
  </div>
)

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="home-wrapper">
      <Card role="User" navigate={navigate} />
      <Card role="Admin" navigate={navigate} />
    </div>
  )
}
