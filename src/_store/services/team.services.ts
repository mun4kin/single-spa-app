import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import Axios from 'axios-observable';
import { ITeam } from '../types/team.types';

import { team } from '../mocks/team.mock';

/** Получение члнов команды */
export const getTeam = (): Observable<ITeam[]> => {
  if (process.env['REACT_APP_LOCAL'] === '1') {
    return of(team as ITeam[]);
  } else {
    return Axios.get(
      `sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/IMyTeam?$expand=user,schedule($expand=createdTask,workTime)`
    ).pipe(
      map(({ data }) => {
        return data.value;
      })
    );
  }
};
