import './App.css';
import type { ReactElement } from 'react';
import { CssBaseline } from '@mui/material';
import { AppRouter } from '@/common/router/AppRouter.tsx';
import { AppProviders } from '@/common/components/AppProviders.tsx';
import { AppContainer } from '@/common/components/AppContainer.tsx';

function App(): ReactElement {
    return (
        <AppProviders>
            <CssBaseline />
            <AppContainer>
                <AppRouter />
            </AppContainer>
        </AppProviders>
    );
}
export default App;
