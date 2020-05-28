import React from 'react';
import { useRouter } from 'next/router';

import { withRedirectUser } from '@with/redirectUser';
import { withApollo } from '@with/apollo';

import { Crux } from '@components/Crux';

import { DashboardUser } from './DashboardUser';
import { DashboardTeam } from './DashboardTeam';

export const Dashboard: React.FC<{}> = () => {
    const {
        query: { team },
    } = useRouter();
    return <Crux>{team ? <DashboardTeam /> : <DashboardUser />}</Crux>;
};

export default withRedirectUser(withApollo({ ssr: false })(Dashboard));
