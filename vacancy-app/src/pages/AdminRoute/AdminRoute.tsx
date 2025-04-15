import {useSelector} from "react-redux";
import {Navigate} from "react-router";
import React, {JSX} from "react";
import {RootState} from "../../types/interfaces/State.ts";


interface AdminRouteProps {
    children: JSX.Element
}

const AdminRoute: React.FC<AdminRouteProps>  = ({children}) => {
    const { isAdmin } = useSelector((state: RootState) => state.auth)
    return isAdmin ? children : <Navigate to="/login" />
}

export default AdminRoute