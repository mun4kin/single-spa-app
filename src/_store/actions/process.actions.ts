import { createTypedAction } from 'redux-actions-ts';
import { IProcess } from '../types/worktime.types';

//------процесс

export const getProcessPending = createTypedAction<{ id: string; user: string; pid: string }>(
  '[Pending] Получение шага процесса для изменение рабочего графика'
);
export const getProcessSuccess = createTypedAction<IProcess>(
  '[Success] Получение шага процесса для изменение рабочего графика'
);

export const saveProcessPending = createTypedAction<IProcess>('[Pending] Сохранение шага процесса');
export const saveProcessSuccess = createTypedAction<void>('[Success] Сохранение шага процесса');

//------

//
//
// export const getRequestByIdPending = createTypedAction<string>('[Pending] Получить процесс по ID');
// export const getRequestByIdSuccess = createTypedAction<IProcess>('[Success] Получить процесс по ID');
