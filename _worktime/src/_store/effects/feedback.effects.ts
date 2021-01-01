import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { IFeedback } from '../types/feedback.types';
import { sendFeedback } from '../services/feedback.services';
import { sendFeedbackPending, sendFeedbackSuccess } from '../actions/feedback.actions';
import { sendNotification } from 'root-front';

/** Отправить обратную связь */
export const sendFeedbackEffect$ = (actions$: ActionsObservable<Action<IFeedback>>) =>
  actions$.pipe(
    ofType(sendFeedbackPending.toString()),
    switchMap(({ payload }) =>
      sendFeedback(payload).pipe(
        map((result: any) => {
          sendNotification({ message: 'Спасибо за обратную связь' });
          return sendFeedbackSuccess(result);
        }),
        catchError(showErrorMessage)
      )
    )
  );
