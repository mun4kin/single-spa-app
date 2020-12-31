import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { causeMock, myAllWorkTime_sap } from '../mocks/dictionary.mock';
import { IOption } from 'root-front/dist/types';
import Axios from 'axios-observable';
import { IProcess } from '../types/worktime.types';
import { ICausesOptions } from '../types/dictionary.types';

//----------------------------------------------------------------------------------------------------------------------
const getParams = (proc: IProcess): string =>
  `procGuid='${proc.procGuid || ''}',wiId='${proc.wiId || ''}',procEmpId='${proc.procEmpId}'`;
const partOfPath = `sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001`;
//----------------------------------------------------------------------------------------------------------------------
/** Получение справочника рабочего времени */
export const workTimeDict = (process_: IProcess, cause: string): Observable<IOption[]> => {
  if (process.env['REACT_APP_LOCAL'] === '1') {
    return of(myAllWorkTime_sap).pipe(map((data) => data.value as IOption[]));
  } else {


    const filter = process_.scenarioStage!=='PROCESS'?`&$filter=(reason eq '${cause}')`:'';
    return Axios.get(`${partOfPath}/IProcess(${getParams(process_)})/allWorkTime?sap-language=RU${filter}`).pipe(
      map(({ data }) => data.value as IOption[])
    );
  }
};
//----------------------------------------------------------------------------------------------------------------------
/** Получение справочника причин */
export const causeDict = (process_: IProcess): Observable<ICausesOptions[]> => {
  if (process.env['REACT_APP_LOCAL'] === '1') {
    return of(causeMock).pipe(map((data) => data as ICausesOptions[]));
  } else {
    return Axios.get(`${partOfPath}/IProcess(${getParams(process_)})/allReason?sap-language=RU`).pipe(
      map(({ data }) => data.value as ICausesOptions[])
    );
  }
};
//----------------------------------------------------------------------------------------------------------------------
/** Справочник перерывов на кормление */
export const feedBreaks = (process_: IProcess): Observable<IOption[]> => {
  return Axios.get(`${partOfPath}/IProcess(${getParams(process_)})/allBreakFeedPer?sap-language=RU`).pipe(
    map(({ data }) => {return data.value as IOption[]})
  );
};
