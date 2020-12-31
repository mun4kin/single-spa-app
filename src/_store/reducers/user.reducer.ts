import { Action } from 'redux-actions';
import { createTypedHandler, handleTypedActions } from 'redux-actions-ts';
import { IUser } from '../types/user.types';
import { userInfoSuccess } from '../actions/user.actions';

export interface IUserState {
  currentUser: IUser | null;
}

const initialState: IUserState = {
  currentUser: null
};

const userReducer = handleTypedActions(
  [
    /** [GET] Получение текущего пользователя */
    createTypedHandler(
      userInfoSuccess,
      (state: IUserState, action: Action<IUser>): IUserState => ({ ...state, currentUser: action.payload })
    )
  ],
  initialState
);

export default userReducer;
