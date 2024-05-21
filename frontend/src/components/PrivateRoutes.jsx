import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    return user && user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
