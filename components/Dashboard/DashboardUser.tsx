import { useCrux } from '@hooks/useCrux';

export const DashboardUser: React.FC = () => {
    const { user } = useCrux();

    return (
        <div>
            Hello, {user.profile.firstName} {user.profile.lastName}!
        </div>
    );
};
