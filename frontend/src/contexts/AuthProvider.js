import React, { createContext } from 'react'
import app from '../firebase/firebase.config'

export const AuthContext = createContext();
const auth = getAuth(app)


const AuthProvider = () => {
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  return (
    <div>AuthProvider</div>
  )
}

export default AuthProvider