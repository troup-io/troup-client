import { useCrux } from '@hooks/useCrux';

export const DashboardTeam: React.FC = () => {
    const { user, team } = useCrux();

    return (
        <div>
            Hello, {user?.profile?.firstName} {user?.profile?.lastName} and welcome to{' '}
            {team?.displayName || team?.name}!
        </div>
    );
};
