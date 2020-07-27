import React from 'react';
import { Routes } from 'react-router-dom';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { Login } from 'components/Login';
import { Signup } from 'components/Signup';
// import { TeamRedirect } from 'components/Dashboard/TeamRedirect';
// import { DashboardRedirect } from 'components/Dashboard/DashboardRedirect';
import { Dashboard } from 'components/Dashboard';
import { Projects } from 'components/Projects';
import { DefaultError } from 'components/DefaultError';
import { Team } from 'components/Team';

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <PublicRoute path="login" element={<Login />} />
            <PublicRoute path="signup" element={<Signup />} />
            <PrivateRoute path="/" element={<Dashboard />} />
            <PrivateRoute path=":team" element={<Team />}>
                <PrivateRoute path="projects" element={<Projects />} />
                <PrivateRoute path="projects/:sequence" element={<Projects />}>
                    <PrivateRoute
                        path="ticket/:number"
                        element={<>showing ticket stuff guuurrrrlllll!</>}
                    />
                </PrivateRoute>
            </PrivateRoute>
            {/* <PublicRoute path="*" */}
            {/* <PrivateRoute path=":team" element={<DashboardRedirect />} /> */}
            {/* <PrivateRoute path=":team/projects" element={<DashboardRedirect />} /> */}
            {/* <PrivateRoute path=":team/projects/:sequence" element={<Projects />} /> */}
        </Routes>
    );
};
