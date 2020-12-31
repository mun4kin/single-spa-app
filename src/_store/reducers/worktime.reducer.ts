import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IBasicWorkTime } from '../types/worktime.types';
import { getMyWorkTimeSuccess, getWorkTimeSuccess } from '../actions/worktime.actions';

export interface IWorktimeState {
  userWorkTime: IBasicWorkTime | null;
  selectedWorkTime: IBasicWorkTime | null;
}

const initialState: IWorktimeState = {
  userWorkTime: null,
  selectedWorkTime: null
};

const worktimeReducer = handleTypedActions(
  [
    /** Получение графика рабочего времени */
    createTypedHandler(
      getMyWorkTimeSuccess,
      (state: IWorktimeState, action: Action<IBasicWorkTime>): IWorktimeState => ({
        ...state,
        userWorkTime: action.payload
      })
    ),
    createTypedHandler(
      getWorkTimeSuccess,
      (state: IWorktimeState, action: Action<IBasicWorkTime>): IWorktimeState => ({
        ...state,
        selectedWorkTime: action.payload
      })
    )
  ],
  initialState
);

export default worktimeReducer;
