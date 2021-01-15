import React, { useEffect, useState } from 'react';
import './Notifications.scss';
import { BehaviorSubject } from 'rxjs';
import { Variant } from 'root-front/dist/types';
import { Notification } from 'root-front';

// ---------------------------------------------------------------------------------------------------------------------

/** Стэк уведомлений */
let notifications$$: BehaviorSubject<INotification[]> = new BehaviorSubject<INotification[]>([]);

/** Удалить уведомление */
export const removeNotification = (id?: number) => {
  if (notifications$$.closed) {
    return;
  }

  let tmp = [...notifications$$.getValue()];

  if (tmp.length > 0) {
    if (id !== undefined) {
      tmp = tmp.filter((n: INotification) => n.id !== id);
    } else {
      tmp.shift();
    }

    notifications$$.next(tmp);
  }
};

/** Добавить уведомление */
export const sendNotification = (message: INotification, delay = 4000) => {
  if (notifications$$.closed) {
    return;
  }

  const tmp = [...notifications$$.getValue()];

  tmp.push({
    ...message,
    id: message.id || Date.now()
  });
  notifications$$.next(tmp);
  setTimeout(() => {
    removeNotification(message.id);
  }, delay);
};

// ----Компонент--------------------------------------------------------------------------------------------------------

export interface INotification {
  /** Текст сообщения */
  message: string;
  /** ID сообщения */
  id?: number;
  /** Тип сообщения */
  variant?: Variant;
  /** Обратный отсчет для уведомлений о повторном подключении*/
  countdown?: number[];
  /** Функция для повторного подключения */
  retryAction?: () => void;
  /** Отменить повторение подключения */
  cancelRetry?: () => void;
}

const Notifications = () => {
  const [sub] = useState<BehaviorSubject<INotification[]>>(notifications$$);

  /** Список уведомлений */
  const [notifications, setNotifications] = useState<INotification[]>([]);

  // -------------------------------------------------------------------------------------------------------------------

  /** Подписываемся на список уведомлений */
  useEffect(() => {
    sub.subscribe((data: INotification[]) => {
      setNotifications(data);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [sub]);

  // -------------------------------------------------------------------------------------------------------------------
  /** Список уведомлений TSX */
  const list = notifications.map((n: INotification, i: number) => (
    <Notification key={n.id || i} item={n} remove={removeNotification} />
  ));

  // -------------------------------------------------------------------------------------------------------------------

  return <div className='rf-notifications__list'>{list}</div>;
};

export default Notifications;
