import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { IUser } from '../types/user.types';
import { user } from '../mocks/user.mock';
import Axios from 'axios-observable';
import { AxiosResponse } from 'axios';

/** [GET] Получение текущего пользователя */
export const userInfo = (): Observable<IUser> => {
  if (process.env['REACT_APP_LOCAL'] === '1') {
    return of(user).pipe(map((data: IUser) => data));
  } else {
    return Axios.get(`sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/IUser('0')`).pipe(
      map(({ data }: AxiosResponse<IUser>) => {
        return data;
      })
    );
  }
};
