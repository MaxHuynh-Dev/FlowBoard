import { ROUTERS } from './router';

export enum SIGN_UP_STEP {
  CREATE_ACCOUNT = 0,
  VERIFY_EMAIL = 1
}

export const buildVerifyEmailRedirect = (origin: string): string =>
  `${origin}/auth/callback?next=${encodeURIComponent(ROUTERS.DASHBOARD)}`;
