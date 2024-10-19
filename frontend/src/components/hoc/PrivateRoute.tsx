import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute: React.FC = () => {
  const { userInfo } = useSelector((state: any) => state.userAuth); // Replace with your correct state structure

  return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
