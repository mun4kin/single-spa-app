import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { workChartForm_sap, workChartForm_sap1 } from '../mocks/worktime.mock';
import { IProcess } from '../types/worktime.types';
import Axios from 'axios-observable';

/** Получение шага процесса для изменение рабочего графика */
export const getProcess = (id: string, user: string, pid: string): Observable<IProcess> => {
  if (process.env['REACT_APP_LOCAL'] === '1') {
    return id === '000000000000'
      ? of(workChartForm_sap1).pipe(map((data) => data))
      : of(workChartForm_sap1).pipe(map((data: IProcess) => data));
  } else {
    const param = `procGuid='${pid || ''}',wiId='${id || ''}',procEmpId='${user || 0}'`;
    return Axios.get(
      `sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/IProcess(${param})?$expand=initiator,user,schedule($expand=workTemplateFlags,startDateFlags,endDateFlags,breakFlags,workTime($expand=startFlags,endFlags)),attachments($select=wiId,attGuid,attType,attTypeText,attFileName),path($expand=user),events`
    ).pipe(
      map((data: any) => {
        return { ...data.data, path: data.data.path || [] };
      })
    );
  }
};
/** Получение шага процесса для изменение рабочего графика */
export const saveProcess = (data: IProcess): Observable<any> => {
  if (process.env['REACT_APP_LOCAL'] === '1') {
    return of(workChartForm_sap).pipe(map((data: IProcess) => data));
  } else {
    return Axios.get(`sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/IProcess`, {
      headers: { 'X-CSRF-Token': 'Fetch' }
    }).pipe(
      map((data) => data.headers['x-csrf-token'] as string),
      switchMap((token: string) => {
        const tmp = { ...data };
        delete tmp.schedule.comment;
        // @ts-ignore
        delete tmp.initiator;
        // @ts-ignore
        delete tmp.user;
        return Axios.post(`sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/IProcess`, tmp, {
          headers: { 'x-csrf-token': token }
        });
      })
    );
  }
};
