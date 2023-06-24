import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {currentUser, loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <div>loading......</div>
    }

    if(currentUser && currentUser.email){
        return children
    }
    return <Navigate to='/login' state={{from:location}} replace ></Navigate>
};

export default PrivateRoute;