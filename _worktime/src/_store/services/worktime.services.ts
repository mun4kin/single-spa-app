import { delay, map, retryWhen, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IBasicWorkTime, IProcess } from '../types/worktime.types';
import Axios from 'axios-observable';
import { AxiosResponse } from 'axios';
import { newTime_sap } from '../mocks/newTime.mock';
import { workChart_sap } from '../mocks/userWorktime.mock';
//----------------------------------------------------------------------------------------------------------------------
/** Получение графика рабочего времени */
export const getMyWorkTime = (): Observable<IBasicWorkTime> => {
  let cont_try = 0;
  if (process.env['REACT_APP_LOCAL'] === '1') {
    return of(workChart_sap).pipe(
      delay(1000),
      map((data: IBasicWorkTime) => data)
    );
  } else {
    return Axios.get(
      `sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/IBasicWorkTime('0')?$expand=workTime,createdTask`
    ).pipe(
      map(({ data }: AxiosResponse<IBasicWorkTime>) => {
        if (data?.createdTask?.wiId === '0') {
          if (cont_try < 3) {
            cont_try += 1;
            // eslint-disable-next-line no-throw-literal
            throw 'reload';
          }
        }
        return data;
      }),
      retryWhen((errors) => {
        return errors.pipe(take(5), delay(2000));
      })
    );
  }
};
//----------------------------------------------------------------------------------------------------------------------
export const getWorkTime = (id: string, proc: IProcess): Observable<IBasicWorkTime> => {
  if (process.env['REACT_APP_LOCAL'] === '1') {
    return of(newTime_sap).pipe(map((data: IBasicWorkTime) => data));
  } else {
    const param = `procGuid='${proc.procGuid}',wiId='${proc.wiId}',procEmpId='${proc.procEmpId}',idWorkTemplate='${id}'`;
    return Axios.get(
      `sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/IProcAllScheduleHead(${param})?$expand=workTime`
    ).pipe(map(({ data }: AxiosResponse<IBasicWorkTime>) => data));
  }
};
