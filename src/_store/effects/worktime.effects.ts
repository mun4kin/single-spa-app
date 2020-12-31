import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';

import { getMyWorkTime, getWorkTime } from '../services/worktime.services';
import {
  getMyWorkTimePending,
  getMyWorkTimeSuccess,
  getWorkTimePending,
  getWorkTimeSuccess
} from '../actions/worktime.actions';
import { IBasicWorkTime, IProcess } from '../types/worktime.types';
import { getProcessPending } from '../actions/process.actions';
import { IStore } from "../index";
//----------------------------------------------------------------------------------------------------------------------
/** Получение моего  графика рабочего времени */
export const getMyWorkTimeEffect$ = (actions$: ActionsObservable<Action<void>>) =>
  actions$.pipe(
    ofType(getMyWorkTimePending.toString()),
    switchMap(() =>
      getMyWorkTime().pipe(
        mergeMap((result: IBasicWorkTime) => {
          const res = [];
          // если приходит имя существующего запроса сразу запрашиваем инфу по нему
          res.push(getMyWorkTimeSuccess(result));

          result.createdTask &&
            res.push(
              getProcessPending({ id: result.createdTask?.wiId, user: '0', pid: result.createdTask?.procGuid || '' })
            );

          return res;
        }),
        catchError(showErrorMessage)
      )
    )
  );
/** Получение графика рабочего времени */
export const getWorkTimeEffect$ = (actions$: ActionsObservable<Action<string>>, state$: StateObservable<IStore>) =>
  actions$.pipe(
    ofType(getWorkTimePending.toString()),
    switchMap(({ payload }) =>
      getWorkTime(payload,state$.value.process.mainProcess as IProcess).pipe(
        map((result: IBasicWorkTime) => getWorkTimeSuccess(result)),
        catchError(showErrorMessage)
      )
    )
  );
