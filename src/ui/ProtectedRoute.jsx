import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Spinner from "./Spinner";

import { useUser } from "../features/authentication/useUser";

function ProtectedRoute({children}){
    const {isAuthenticated, isLoading} = useUser()
    const navigate = useNavigate();

    useEffect(function(){
        if (!isAuthenticated && !isLoading) 
            navigate('/login')
    }, [isAuthenticated, isLoading, navigate])

    if (isLoading) return <Spinner />

    if (isAuthenticated) return children
}

export default ProtectedRoute;