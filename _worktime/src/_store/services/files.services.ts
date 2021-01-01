import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import Axios from 'axios-observable';
import { AxiosResponse } from 'axios';
import { IAttachment } from '../types/worktime.types';

const photo = 'data:application/pdf;base64,JVBERi0xLjYNJeLjz9MNCjE2NSAwIG9iago8PC9GaWx0Z';
const download = (file: IAttachment, name: string) => {
  if (window.navigator && window.navigator.msSaveBlob) {
    const tmp = (file.attBase64 || '').split(';base64,');
    const byteCharacters = atob(tmp[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: tmp[0].split(':')[1] });
    window.navigator.msSaveOrOpenBlob(blob, name);
  } else {
    const a = document.createElement('a');
    a.href = file.attBase64 || '';
    a.download = name;
    a.click();
  }
};

/** Скачать файл */
export const downloadFile = (at: IAttachment): Observable<void> => {
  if (process.env['REACT_APP_LOCAL'] === '1') {
    return of(photo).pipe(
      map((data: string) => {
        const a = document.createElement('a');
        a.href = data;
        a.download = at.attFileName;
        a.click();
      })
    );
  } else {
    const doc = at.attAction === 'downloadDOP' ? 'IProcDocument' : 'IProcAttachment';
    at.attAction = '';

    const val =
      doc === 'IProcAttachment'
        ? `procEmpId='',procGuid='${at.procGuid}',wiId='${at.wiId}',attGuid='${at.attGuid}'`
        : `procEmpId='',procGuid='',wiId='${at.wiId}',templateName='WORKSCHEDULE'`;
    return Axios.get(`sap/opu/odata4/sap/zhrasr/default/sap/zhrasr_0663_schedule/0001/${doc}(${val})`).pipe(
      map(({ data }: AxiosResponse<IAttachment>) => {
        download(data, at.attFileName);
      })
    );
  }
};
