import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    // let auth = {'token': false}
    return (
        user?.token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes