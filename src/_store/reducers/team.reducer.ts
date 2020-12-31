import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { ITeam } from '../types/team.types';
import { getTeamSuccess } from '../actions/team.actions';

export interface ITeamState {
  myTeam: ITeam[];
  selectedUser: null | ITeam;
}

const initialState: ITeamState = {
  myTeam: [],
  selectedUser: null
};

const teamReducer = handleTypedActions(
  [
    /** Получение члнов команды */
    createTypedHandler(getTeamSuccess, (state: ITeamState, action: Action<ITeam[]>) => ({
      ...state,
      myTeam: action.payload
    }))
  ],
  initialState
);

export default teamReducer;
