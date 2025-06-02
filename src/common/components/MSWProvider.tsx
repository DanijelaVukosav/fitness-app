import React, { useEffect, useState } from 'react';
import { isMockingEnabled, startMocking } from '@/mocks/browser.ts';
import { PageLoader } from '@/common/components/PageLoader.tsx';

export const MSWProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMswReady, setIsMswReady] = useState(!isMockingEnabled());

    useEffect(() => {
        if (isMockingEnabled()) {
            startMocking()
                .then(() => {
                    setIsMswReady(true);
                })
                .catch((error) => {
                    console.error('Failed to start MSW:', error);
                    setIsMswReady(true);
                });
        }
    }, []);

    if (!isMswReady) {
        return <PageLoader />;
    }

    return <>{children}</>;
};
