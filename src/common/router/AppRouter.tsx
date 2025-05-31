import { lazy, type ReactElement, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { APPLICATION_ROUTES } from '@/common/router/types.ts';
import { PageLoader } from '@/common/components/PageLoader.tsx';

const ActivitiesPage = lazy(() => import('@/pages/Activities/ActivitiesPage.tsx'));
const UserGoalsPage = lazy(() => import('@/pages/Goals/UserGoalsPage.tsx'));

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
                        path={APPLICATION_ROUTES.GOALS}
                        element={
                            <Suspense fallback={<PageLoader />}>
                                <UserGoalsPage />
                            </Suspense>
                        }
                    />

                    <Route path="*" element={<Navigate to={APPLICATION_ROUTES.ACTIVITIES} />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
