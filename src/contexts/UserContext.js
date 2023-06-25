import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.init';

export const AuthContext = createContext()
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

const UserContext = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [totalCartLength,setTotalCartLength] = useState(0)

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user !== currentUser) {
              setCurrentUser(user)
              setLoading(false)
              console.log(currentUser);
            } else {
              setCurrentUser(null)
              setLoading(false)
            }
          });

          return () => unSubscribe()

    },[])
    
    const createUserWithEmail = (email,password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const continueWithGoogle = () => {
        return signInWithPopup(auth,provider)
    }

    const signInUserWithEmail = (email,password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const authInfo = {currentUser,loading, createUserWithEmail, continueWithGoogle, signInUserWithEmail, logOut, totalCartLength,setTotalCartLength}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;