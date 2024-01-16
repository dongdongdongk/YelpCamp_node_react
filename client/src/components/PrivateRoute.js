// PrivateRoute.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isLogin, ...rest }) => {
  return isLogin ? (
    <Route {...rest} element={children} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;