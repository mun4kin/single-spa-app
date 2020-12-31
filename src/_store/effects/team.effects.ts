import { ActionsObservable, ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'redux-actions';
import { showErrorMessage } from '../_commonActions/error.actions';
import { ITeam } from '../types/team.types';
import { getTeam } from '../services/team.services';
import { getTeamPending, getTeamSuccess } from '../actions/team.actions';

/** Получение члнов команды */
export const getTeamEffect$ = (actions$: ActionsObservable<Action<void>>) =>
  actions$.pipe(
    ofType(getTeamPending.toString()),
    switchMap(() =>
      getTeam().pipe(
        map((result: ITeam[]) => getTeamSuccess(result)),
        catchError(showErrorMessage)
      )
    )
  );
