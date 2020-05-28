import { ButtonPrimary } from '@atoms/Button';

import { useCrux } from '@hooks/useCrux';

import { logout } from '@utils';

export const DashboardUser: React.FC = () => {
    const { user } = useCrux();

    return (
        <div>
            Hello, {user.profile.firstName} {user.profile.lastName}!<br />
            <ButtonPrimary onClick={logout}>Logout</ButtonPrimary>
        </div>
    );
};
