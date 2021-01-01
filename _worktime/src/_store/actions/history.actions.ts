import { createTypedAction } from 'redux-actions-ts';
import { IProcess } from '../types/worktime.types';

export const getHistoryPending = createTypedAction<void>('[Pending] Получение истории заявок');
export const getHistorySuccess = createTypedAction<IProcess[]>('[Success] Получение истории заявок');

export const getTasksPending = createTypedAction<void>('[Pending] Получить список задач');
export const getTasksSuccess = createTypedAction<IProcess[]>('[Success] Получить список задач');
