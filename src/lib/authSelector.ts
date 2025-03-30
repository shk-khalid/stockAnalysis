import type { RootState } from '../hooks/useRedux';

export const selectCurrentUser = (state: RootState) => state.auth.user;
