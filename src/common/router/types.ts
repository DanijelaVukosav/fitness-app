export enum AppRouteParameters {
    ACTIVITY_ID = ':activityId'
}

export enum AppRouteParameterFields {
    ACTIVITY_ID = 'activityId'
}

export const APPLICATION_ROUTES = {
    ACTIVITIES: '/activities',
    ACTIVITY_DETAILS: `/activities/${AppRouteParameters.ACTIVITY_ID}`,
    GOALS: `/goals`
};
