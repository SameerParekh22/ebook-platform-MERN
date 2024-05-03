import React, { createContext, useState, useEffect } from 'react'
import app from '../firebase/firebase.config'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email,password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  //login handling (from Signup Page) thorugh GOOGLE ID
  const loginwithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  //login handling (from login Page) thorugh GOOGLE ID
  const login = (email,password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
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
    loading,
    user,
    createUser,
    loginwithGoogle,
    login
  }
  return (
   <AuthContext.Provider value = {authInfo}>
      {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider