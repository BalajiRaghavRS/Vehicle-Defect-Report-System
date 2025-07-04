import { createContext, useState, useContext } from 'react'

// create context
export const Auth = createContext(null)

// custom hook to access auth context
export const useAuth = () => useContext(Auth)

// context provider
export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null) // { userId, role }

  return (
    <Auth.Provider value={{ session, setSession }}>
      {children}
    </Auth.Provider>
  )
}
