import { lazy, type ReactElement, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { APPLICATION_ROUTES } from '@/router/types.ts';
import { PageLoader } from '@/components/common/PageLoader.tsx';

const ActivitiesPage = lazy(() => import('@/pages/Activities/ActivitiesPage.tsx'));
const UserSettingsPage = lazy(() => import('@/pages/UserSettingPage.tsx'));

export const AppRouter = (): ReactElement => {
    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route
                        path={APPLICATION_ROUTES.ACTIVITIES}
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <ActivitiesPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path={APPLICATION_ROUTES.SETTINGS}
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <UserSettingsPage />
                            </Suspense>
                        }
                    />

                    <Route path="*" element={<Navigate to={APPLICATION_ROUTES.ACTIVITIES} />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
