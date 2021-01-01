import { createTypedAction } from 'redux-actions-ts';
import { ITeam } from '../types/team.types';

export const getTeamPending = createTypedAction<void>('[Pending] Получение членов команды');
export const getTeamSuccess = createTypedAction<ITeam[]>('[Success] Получение членов команды');
