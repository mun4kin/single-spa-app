import { createTypedAction } from 'redux-actions-ts';
import { IUser } from '../types/user.types';

//все для работы с юзером
export const userInfoPending = createTypedAction<void>('[Pending] Получение текущего пользователя');
export const userInfoSuccess = createTypedAction<IUser>('[Success] Получение текущего пользователя');
