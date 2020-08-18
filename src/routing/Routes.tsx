import React from 'react';
import { Routes } from 'react-router-dom';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { Login } from 'components/Login';
import { Signup } from 'components/Signup';
import { Dashboard } from 'components/Dashboard';
import { Projects } from 'components/Projects';
import { Team } from 'components/Team';
import { ProjectsCreate } from 'components/Projects/ProjectsCreate';
import { ProjectsRedirect } from 'components/Projects/ProjectsRedirect';
import { Tickets } from 'components/Tickets';
import { Ticket } from 'components/Ticket';
import { TicketsCreate } from 'components/Tickets/TicketsCreate';
// import { TicketsCreate } from 'components/Ticket/TicketCreate';

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <PublicRoute path="login" element={<Login />} />
            <PublicRoute path="signup" element={<Signup />} />
            <PrivateRoute path="/" element={<Dashboard />} />
            <PrivateRoute path=":team" element={<Team />}>
                <PrivateRoute path="projects" element={<Projects />} />
                <PrivateRoute path="projects/create" element={<ProjectsCreate />} />
                <PrivateRoute path="projects/:projectSequence" element={<ProjectsRedirect />}>
                    <PrivateRoute path="tickets" element={<Tickets />} />
                    <PrivateRoute path="tickets/create" element={<TicketsCreate />} />
                    <PrivateRoute path="tickets/:ticketSequence" element={<Ticket />} />
                    {/* <PrivateRoute path="tickets" element={<Tickets />}> */}
                    {/* <PrivateRoute path=":ticketSequence" element={<Ticket />} /> */}
                    {/* </PrivateRoute> */}
                    {/* </PrivateRoute> */}
                    {/* <PublicRoute path="/*" element={<DefaultError status={404} />} /> */}
                </PrivateRoute>
            </PrivateRoute>
            {/* <PrivateRoute path=":team" element={<DashboardRedirect />} /> */}
            {/* <PrivateRoute path=":team/projects" element={<DashboardRedirect />} /> */}
            {/* <PrivateRoute path=":team/projects/:sequence" element={<Projects />} /> */}
        </Routes>
    );
};
