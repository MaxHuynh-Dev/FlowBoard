export enum ROUTERS {
  HOME = '/',
  LOGIN = '/login',
  SIGN_UP = '/sign-up',
  DASHBOARD = '/dashboard',
  PROFILE = '/profile'
}

export const PUBLISH_ROUTES = [ROUTERS.LOGIN, ROUTERS.SIGN_UP];
export const AUTH_ROUTES = [ROUTERS.DASHBOARD, ROUTERS.PROFILE];
