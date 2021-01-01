import { createTypedAction } from 'redux-actions-ts';

import { of } from 'rxjs';
import { sendNotification } from 'root-front';

export const errorActions = createTypedAction<void>('[Error] ===!!!!!!!!!===');

export const redirect = (url?: string) => {
  const l = window.location;
  window.location.assign(url || l.origin + l.pathname + l.search);
};

export const showErrorMessage = (e: any | string) => {
  if (typeof e === 'string') {
    sendNotification({ message: new Error(e).message, variant: 'danger' });
  } else {
    try {
      e.response.data.error.details.forEach((item: any) => {
        if (item['@SAP__common.Severity'] === 'error')
          sendNotification({
            message: item.message,
            variant: 'danger'
          });
      });
    } catch (e) {
      sendNotification({
        message: 'Проблема с сервером, попробуйте зайти позже. Будет выполнен переход на домашнюю страницу',
        variant: 'danger'
      });
    }
  }

  return of(errorActions());
};
