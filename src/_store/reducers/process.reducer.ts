import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';

import { getProcessPending, getProcessSuccess } from '../actions/process.actions';
import { IProcess } from '../types/worktime.types';

export interface IGetProcessState {
  mainProcess: IProcess | null;
  loaded: boolean;
}

const initialState: IGetProcessState = {
  mainProcess: null,
  loaded: false
};

const processReducer = handleTypedActions(
  [
    /** Получение шага процесса*/
    createTypedHandler(
      getProcessSuccess,
      (state: IGetProcessState, action: Action<IProcess>): IGetProcessState => ({
        ...state,
        mainProcess: action.payload,
        loaded: true
      })
    ),
    createTypedHandler(
      getProcessPending,
      (state: IGetProcessState): IGetProcessState => ({
        ...state,
        loaded: false
      })
    )
  ],
  initialState
);

export default processReducer;
