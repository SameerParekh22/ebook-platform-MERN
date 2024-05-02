import React, { createContext, useState } from 'react'
import app from '../firebase/firebase.config'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app)


const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email,password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  //using useEffect for the current user info on home page
  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      //console.log(currentUser)
      setUser(currentUser)
      setLoading(false)
    });
    return () => {
      return unsubscribe
    }
  },[])

 const authInfo = {
    user,
    createUser
  }
  return (
   <AuthContext.Provider value = {authInfo}>
      {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider