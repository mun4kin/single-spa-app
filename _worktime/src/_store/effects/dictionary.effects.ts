import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { catchError, switchMap, filter, mergeMap, map } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { workTimeDict, causeDict, feedBreaks } from '../services/dictionary.services';
import {
  workTimeDictPending,
  workTimeDictSuccess,
  causeDictPending,
  causeDictSuccess,
  setCurrentCauseSuccess,
  feedBreaksPending,
  feedBreaksSuccess
} from '../actions/dictionary.actions';
import { IOption } from 'root-front/dist/types';
import { IStore } from '../index';
import { IProcess } from '../types/worktime.types';
import { ICausesOptions } from '../types/dictionary.types';
//----------------------------------------------------------------------------------------------------------------------
/** Получение справочника рабочего времени */
export const workTimeDictEffect$ = (actions$: ActionsObservable<Action<string>>, state$: StateObservable<IStore>) =>
  actions$.pipe(
    ofType(workTimeDictPending.toString()),
    switchMap(({ payload }) =>
      workTimeDict(state$.value.process.mainProcess as IProcess, payload).pipe(
        mergeMap((result: IOption[]) => [workTimeDictSuccess(result), setCurrentCauseSuccess(payload)]),
        catchError(showErrorMessage)
      )
    )
  );
//----------------------------------------------------------------------------------------------------------------------
/** Получение справочника причин */
export const causeDictEffect$ = (actions$: ActionsObservable<Action<void>>, state$: StateObservable<IStore>) =>
  actions$.pipe(
    ofType(causeDictPending.toString()),
    filter(() => !state$.value.dictionary.isLoadCauses),
    switchMap(() => {
      const proc = state$.value.process.mainProcess as IProcess;
      return causeDict(proc).pipe(
        mergeMap((result: ICausesOptions[]) => [causeDictSuccess(result), workTimeDictPending(proc.reason)]),
        catchError(showErrorMessage)
      );
    })
  );
//----------------------------------------------------------------------------------------------------------------------
/** Справочник перерывов на кормление */
export const feedBreaksEffect$ = (actions$: ActionsObservable<Action<void>>, state$: StateObservable<IStore>) =>
  actions$.pipe(
    ofType(feedBreaksPending.toString()),
    switchMap(() =>
      feedBreaks(state$.value.process.mainProcess as IProcess).pipe(
        map((result: IOption[]) => feedBreaksSuccess(result)),
        catchError(showErrorMessage)
      )
    )
  );
