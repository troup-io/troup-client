import React from 'react';
import { Outlet, Navigate, useOutlet } from 'react-router-dom';

import { Content } from 'system/atoms/Content';

export const Team: React.FC = () => {
    const outlet = useOutlet();

    if (!outlet) {
        return <Navigate to="projects" replace />;
    }

    return (
        <Content p={3}>
            <Outlet />
        </Content>
    );
};
