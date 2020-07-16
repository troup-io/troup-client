import { Box } from '@primer/components';

import { useCrux } from '@hooks/useCrux';

export const DashboardTeam: React.FC = () => {
    const { user, team } = useCrux();

    return (
        <Box>
            Hello, {user?.profile?.firstName} {user?.profile?.lastName} and welcome to{' '}
            {team?.displayName || team?.name}!
        </Box>
    );
};
