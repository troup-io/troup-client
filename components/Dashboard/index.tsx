import React from 'react';
import { useRouter } from 'next/router';

import { withPrivateRoute } from '@with/privateRoute';

import { DashboardRedirect } from './DashboardRedirect';
import { DashboardTeam } from './DashboardTeam';

export const Dashboard: React.FC<{}> = () => {
    const {
        query: { team },
    } = useRouter();
    return <>{team ? <DashboardTeam /> : <DashboardRedirect />}</>;
};

export default withPrivateRoute(Dashboard);
