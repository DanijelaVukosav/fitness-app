import { type FC } from 'react';
import { GoalProvider } from '@/pages/Goals/services/GoalContext.tsx';
import { GoalsContainer } from '@/pages/Goals/components/GoalsContainer.tsx';

const UserSettingsPage: FC = () => {
    return (
        <GoalProvider>
            <GoalsContainer />
        </GoalProvider>
    );
};

export default UserSettingsPage;
