import Axios from 'axios-observable';
import { AxiosRequestConfig } from 'axios';
import { of } from 'rxjs';
import { users } from '../logins';

/** Interceptors */
const intercept = () => {
  Axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers.hasOwnProperty('NOINTERCEPT')) {
        return config;
      }
      config.headers['Cache-Control'] = 'no-cache';
      config.headers['Expires'] = '-1';
      // авторизация на дев стенде
      if (process.env.REACT_APP_ENV === 'dev') {
        config.headers.Authorization = process.env.REACT_APP_BASIC_AUTH;
        for (const key in users) {
          ~key.indexOf('+') && (config.headers.Authorization = users[key]);
        }
      }
      //  стандартный конфиг ссылки
      config.url = (process.env.REACT_APP_HOST as string) + config.url;

      return config;
    },
    (error) => {
      return of(new Error(error));
    }
  );
};

export default intercept;
