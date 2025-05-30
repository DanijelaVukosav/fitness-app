import './App.css';
import type { ReactElement } from 'react';
import { CssBaseline } from '@mui/material';
import { AppRouter } from '@/router/AppRouter.tsx';
import { AppProviders } from '@/components/common/AppProviders.tsx';
import { AppContainer } from '@/components/common/AppContainer.tsx';

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
