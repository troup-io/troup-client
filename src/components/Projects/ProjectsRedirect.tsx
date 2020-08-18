import React from 'react';
import { useOutlet, Outlet, Navigate } from 'react-router-dom';

export const ProjectsRedirect: React.FC = () => {
    const outlet = useOutlet();

    return outlet ? <Outlet /> : <Navigate to="tickets" replace />;
};
