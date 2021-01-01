import { createTypedAction } from 'redux-actions-ts';
import { IOption } from 'root-front/dist/types';
import { ICausesOptions } from '../types/dictionary.types';
//обращение со словорями
export const workTimeDictPending = createTypedAction<string>('[Pending] Получение справочника рабочего времени');
export const workTimeDictSuccess = createTypedAction<IOption[]>('[Success] Получение справочника рабочего времени');

export const causeDictPending = createTypedAction<void>('[Pending] Получение справочника причин');
export const causeDictSuccess = createTypedAction<ICausesOptions[]>('[Success] Получение справочника причин');

export const setCurrentCauseSuccess = createTypedAction<string>('[Success] сохранение актуальной причины');

export const feedBreaksPending = createTypedAction<void>('[Pending] Справочник перерывов на кормление');
export const feedBreaksSuccess = createTypedAction<IOption[]>('[Success] Справочник перерывов на кормление');
