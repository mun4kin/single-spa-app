import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Axios from 'axios-observable';
import { IProcess } from '../types/worktime.types';

/** Получение истории заявок */
export const getHistory = (): Observable<IProcess[]> => {
  return Axios.get(
    `sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/IProcHist?$expand=initiator,user&$top=30`
  ).pipe(map(({ data }) => data.value as IProcess[]));
};

/** Получить список задач */
export const getTasks = (): Observable<IProcess[]> => {
  return Axios.get(
    `sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/IProcInbox?$expand=initiator,user`
  ).pipe(map(({ data }) => data.value as IProcess[]));
};
