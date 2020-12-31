import { createSelector } from 'reselect';
import { IStore } from '../index';

export const userWithWorkTime = createSelector(
  [(store: IStore) => store.user.currentUser, (store: IStore) => store.worktime.userWorkTime],
  (user, worktime) => {
    return user && worktime
      ? {
        user,
        worktime
      }
      : { user: null, worktime: null };
  }
);
