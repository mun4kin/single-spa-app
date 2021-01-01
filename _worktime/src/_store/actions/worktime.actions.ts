import { createTypedAction } from 'redux-actions-ts';
import { IBasicWorkTime } from '../types/worktime.types';

//получение графиков времени
export const getMyWorkTimePending = createTypedAction<void>('[Pending] Получение моего графика рабочего времени');
export const getMyWorkTimeSuccess = createTypedAction<IBasicWorkTime>(
  '[Success] Получение моего графика рабочего времени'
);

export const getWorkTimePending = createTypedAction<string>('[Pending] Получение графика рабочего времени');
export const getWorkTimeSuccess = createTypedAction<IBasicWorkTime>('[Success] Получение графика рабочего времени');
