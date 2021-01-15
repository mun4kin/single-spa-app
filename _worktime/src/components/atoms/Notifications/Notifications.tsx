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
  if (notifications$$.closed || notifications$$.isStopped) {
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
  if (notifications$$.closed || notifications$$.isStopped) {
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
  const [sub] = useState<BehaviorSubject<INotification[]>>(() => {
    console.log('---useState------');
    console.log('useState', notifications$$);
    if (notifications$$.closed || notifications$$.isStopped) {
      notifications$$ = new BehaviorSubject<INotification[]>([]);
    }

    console.log('useState: return', notifications$$);
    return notifications$$;
  });

  /** Список уведомлений */
  const [notifications, setNotifications] = useState<INotification[]>([]);

  // -------------------------------------------------------------------------------------------------------------------

  /** Подписываемся на список уведомлений */
  useEffect(() => {
    console.log('---useEffect------');
    console.log('useEffect:sub', sub);
    console.log('useEffect:sub', notifications$$);
    sub.subscribe((data: INotification[]) => {
      console.log('---subscribe------');
      console.log('useEffect:sub:subscribe', sub);
      console.log('useEffect:sub', notifications$$);
      setNotifications(data);
    });

    return () => {
      console.log('useEffect:sub:unsubscribe');
      sub.unsubscribe();
    };
  }, []);

  // -------------------------------------------------------------------------------------------------------------------
  /** Список уведомлений TSX */
  const list = notifications.map((n: INotification, i: number) => (
    <Notification key={n.id || i} item={n} remove={removeNotification} />
  ));

  // -------------------------------------------------------------------------------------------------------------------

  return <div className='rf-notifications__list'>{list}</div>;
};

export default Notifications;
