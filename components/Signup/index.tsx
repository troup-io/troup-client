import React from 'react';

import { withRedirectUser } from '@with/redirectUser';
import { withApollo } from '@with/apollo';

import { SignupTeam } from './SignupTeam';
import { SignupUser } from './SignupUser';
import { AuthWrapper } from '@components/AuthWrapper';

export const Signup: React.FC<null> = () => {
    return <AuthWrapper pageHeading="Signup" team={SignupTeam} user={SignupUser} />;
};

export default withRedirectUser(withApollo({ ssr: false })(Signup));
