import { ButtonPrimary } from '@atoms/Button';

import { logout } from '@utils';

export const DashboardTeam: React.FC = () => {
    return (
        <div>
            This is the homepage accessible only after login to a particular team!
            <ButtonPrimary onClick={logout}>Logout</ButtonPrimary>
        </div>
    );
};
