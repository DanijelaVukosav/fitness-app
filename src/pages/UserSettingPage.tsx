import { type FC } from 'react';
import { GoalProvider } from '@/context/GoalContext.tsx';
import { GoalsContainer } from '@/components/Goals/GoalsContainer.tsx';

const UserSettingsPage: FC = () => {
    return (
        <GoalProvider>
            <GoalsContainer />
        </GoalProvider>
    );
};

export default UserSettingsPage;
