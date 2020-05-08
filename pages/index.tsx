import React from 'react';
import { withApollo, withPrivateRoute } from '../with';

const Dashboard: React.FC<{}> = () => {
    return <div>This is the homepage accessible only after login!</div>;
};

export default withPrivateRoute(withApollo()(Dashboard));
