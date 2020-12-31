import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IProcess } from '../types/worktime.types';
import { getHistorySuccess, getTasksSuccess } from '../actions/history.actions';

export interface IHistoryState {
  history: IProcess[];
  tasks: IProcess[];
}

const initialState: IHistoryState = {
  history: [],
  tasks: []
};

const historyReducer = handleTypedActions(
  [
    /** Получение истории заявок */
    createTypedHandler(getHistorySuccess, (state: IHistoryState, action: Action<IProcess[]>) => {
      return { ...state, history: action.payload };
    }),

    /** Получить список задач */
    createTypedHandler(
      getTasksSuccess,
      (state: IHistoryState, action: Action<IProcess[]>): IHistoryState => {
        const idLocal = localStorage.getItem('wiId');
        localStorage.removeItem('wiId');
        console.log(idLocal)
        return {
          ...state,
          tasks: action.payload.filter((i) => i.wiId !== idLocal)
        };
      }
    )
  ],
  initialState
);

export default historyReducer;
