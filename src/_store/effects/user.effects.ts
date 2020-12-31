import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { IUser } from '../types/user.types';
import { userInfo } from '../services/user.services';
import { userInfoPending, userInfoSuccess } from '../actions/user.actions';

/** [GET] Получение текущего пользователя */
export const userInfoEffect$ = (actions$: ActionsObservable<Action<void>>) =>
  actions$.pipe(
    ofType(userInfoPending.toString()),
    switchMap(() =>
      userInfo().pipe(
        map((result: IUser) => userInfoSuccess(result)),
        catchError(showErrorMessage)
      )
    )
  );
