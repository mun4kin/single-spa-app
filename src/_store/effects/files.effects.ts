import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';


import { downloadFile } from '../services/files.services';
import { downloadFilePending, downloadFileSuccess } from '../actions/files.actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { IAttachment } from "../types/worktime.types";

/** Скачать файл */
export const downloadFileEffect$ = (actions$: ActionsObservable<Action<IAttachment>>) =>
  actions$.pipe(
    ofType(downloadFilePending.toString()),
    switchMap(({ payload }) =>
      downloadFile(payload).pipe(
        map(() => downloadFileSuccess()),
        catchError(showErrorMessage)
      )
    )
  );
