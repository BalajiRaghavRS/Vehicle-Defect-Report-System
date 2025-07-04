import AuthForm from '../components/AuthForm'
import './AuthPage.css'

export default function AuthPage({ role }) {
  return (
    <div className="auth-page">
      <h1>{role} Portal</h1>
      <AuthForm role={role} />
    </div>
  )
}
