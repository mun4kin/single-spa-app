import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';

import { IProcess } from '../types/worktime.types';
import { getHistory, getTasks } from '../services/history.services';
import { getHistoryPending, getHistorySuccess, getTasksPending, getTasksSuccess } from '../actions/history.actions';
import { showErrorMessage } from '../_commonActions/error.actions';


/** Получение истории заявок */
export const getHistoryEffect$ = (actions$: ActionsObservable<Action<void>>) =>
  actions$.pipe(
    ofType(getHistoryPending.toString()),
    switchMap(() =>
      getHistory().pipe(
        map((result: IProcess[]) => getHistorySuccess(result)),
        catchError(showErrorMessage)
      )
    )
  );
 

/** Получить список задач */
export const getTasksEffect$ = (actions$: ActionsObservable<Action<void>>) =>
  actions$.pipe(
    ofType(getTasksPending.toString()),
    switchMap(() =>
      getTasks().pipe(
        map((result: IProcess[]) => getTasksSuccess(result)),
        catchError(showErrorMessage)
      )
    )
  );
