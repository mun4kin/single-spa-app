import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Axios from 'axios-observable';
import { AxiosResponse } from 'axios';
import { IFeedback } from '../types/feedback.types'; 

/** Отправить обратную связь */
export const sendFeedback = (payload: IFeedback): Observable<any> => {
  return Axios.get(`sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/IProcess`, {
    headers: { 'X-CSRF-Token': 'Fetch' }
  }).pipe(
    map((data) => data.headers['x-csrf-token'] as string),
    switchMap((token: string) => {
      return Axios.post(`sap/opu/odata/sap/ZHRXSS_FDBK_SERV_NEW_SRV/messagesSet`, payload, {
        headers: { 'x-csrf-token': token }
      }).pipe(map(({ data }: AxiosResponse<any>) => data));
    })
  );
};
