import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { redirect, showErrorMessage } from '../_commonActions/error.actions';

import { getProcess, saveProcess } from '../services/process.services';
import {
  getProcessPending,
  getProcessSuccess,
  saveProcessPending,
  saveProcessSuccess
} from '../actions/process.actions';
import { IProcess } from '../types/worktime.types';
import { getWorkTimeSuccess } from '../actions/worktime.actions';
import { sendNotification } from 'root-front';
import { causeDictPending } from '../actions/dictionary.actions';

//----------------------------------------------------------------------------------------------------------------------
/** Получение шага процесса для изменение рабочего графика */
export const getProcessEffect$ = (actions$: ActionsObservable<Action<{ id: string; user: string; pid: string }>>) =>
  actions$.pipe(
    ofType(getProcessPending.toString()),
    switchMap(({ payload }) =>
      getProcess(payload.id, payload.user, payload.pid).pipe(
        mergeMap((result: IProcess) => [
          getProcessSuccess(result),
          getWorkTimeSuccess(result.schedule),
          causeDictPending()
        ]),
        catchError(showErrorMessage)
      )
    )
  );
//----------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
/** Получение шага процесса для изменение рабочего графика */
export const saveProcessEffect$ = (actions$: ActionsObservable<Action<IProcess>>) =>
  actions$.pipe(
    ofType(saveProcessPending.toString()),
    switchMap(({ payload }) =>
      saveProcess(payload).pipe(
        mergeMap(() => {
          let mess = 'Данные успешно отправлены, статус можно ослеживать на домашней странице';
          if (!['NEW', 'REQUEST', 'ZSIGNITURE'].includes(payload.scenarioStage as string) && payload.wiId !== '0') {
            mess = 'Данные успешно отправлены, сотрудник получит уведомление  по почте';
          }

          payload.event === 'WITHDRAW' && (mess = 'Заявка успешно отменена, можно создать новую на главной странице');

          sendNotification({
            message: mess,
            variant: 'info'
          });

          setTimeout(() => {
            localStorage.setItem('wiId', payload.wiId);
            redirect();
          }, 4000);
          return [saveProcessSuccess()];
        }),
        catchError(showErrorMessage)
      )
    )
  );
//----------------------------------------------------------------------------------------------------------------------
