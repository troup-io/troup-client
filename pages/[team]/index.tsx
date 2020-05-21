import React from 'react';

import { withPrivateRoute } from '@with/privateRoute';
import { withApollo } from '@with/apollo';

const Dashboard: React.FC<{}> = () => {
    return <div>This is the homepage accessible only after login to a particular team!</div>;
};

export default withPrivateRoute(withApollo()(Dashboard));
