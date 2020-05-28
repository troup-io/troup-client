import { ButtonPrimary } from '@atoms/Button';

import { logout } from '@utils';

export const DashboardUser: React.FC = () => {
    return (
        <div>
            This is the homepage accessible after a generic login!
            <ButtonPrimary onClick={logout}>Logout</ButtonPrimary>
        </div>
    );
};
