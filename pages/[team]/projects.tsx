import React from 'react';

import { withPrivateRoute } from '@with/privateRoute';

const Projects: React.FC = () => {
    return <div>Projects!</div>;
};

export default withPrivateRoute(Projects);
