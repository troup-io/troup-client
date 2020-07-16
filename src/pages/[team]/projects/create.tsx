import { withPrivateRoute } from '@with/privateRoute';

export const ProjectsCreate: React.FC = () => {
    return <div>Project creation</div>;
};

export default withPrivateRoute(ProjectsCreate);
