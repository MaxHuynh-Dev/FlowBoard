export enum ROUTERS {
  HOME = '/',
  LOGIN = '/login',
  SIGN_UP = '/sign-up',
  FORGOT_PASSWORD = '/forgot-password',
  DASHBOARD = '/dashboard',
  PROFILE = '/profile'
}

// FORGOT_PASSWORD is intentionally in neither list: it must stay reachable both for
// signed-out users requesting a link and for the recovery session created when they
// open that link (which would be bounced to the dashboard by PUBLISH_ROUTES).
export const PUBLISH_ROUTES = [ROUTERS.LOGIN, ROUTERS.SIGN_UP];
export const AUTH_ROUTES = [ROUTERS.DASHBOARD, ROUTERS.PROFILE];
