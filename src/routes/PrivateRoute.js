import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from "react-router-dom"
import React from 'react'

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    // const navigate = useNavigate();

    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate>
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute