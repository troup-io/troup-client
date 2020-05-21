import React from 'react';

import { withRedirectUser } from '@with/redirectUser';
import { withApollo } from '@with/apollo';

import { AuthWrapper } from '@components/AuthWrapper';

import { LoginUser } from './LoginUser';
import { LoginTeam } from './LoginTeam';

export const Login: React.FC<{}> = () => {
    return <AuthWrapper pageHeading="Login" team={LoginTeam} user={LoginUser} />;
};

export default withRedirectUser(withApollo({ ssr: false })(Login));
