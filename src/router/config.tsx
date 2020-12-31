import React, { ComponentType, lazy, LazyExoticComponent, ReactNode } from 'react';
// import { UserRole } from 'store/user/user.types';
// import { getValidatedRole } from 'common/utils/user';

/** Везде, где подключается <Router routes={routes}/>, кроме App.tsx, routes: IRoute[] берется из пропсов IProps. */

export interface IRoute {
  /** Адрес */
  path: string;
  /** Точность совпадения */
  exact: boolean;
  /** Защищенный роут */
  private?: boolean;
  /** Компонент */
  component?: LazyExoticComponent<ComponentType<any>>;
  // /** Для каких ролей доступен данный роут */
  // roleGuard?: UserRole[];
  /** Дочерние роуты */
  routes?: IRoute[];
  /** Редирект*/
  redirect?: string;
  /** Прелоудер ф*/
  fallback: NonNullable<ReactNode> | null;
}

export interface IRolesConfig {
  [key: string]: {
    redirect: string;
    home: string;
  };
}

export const routes = [
  {
    path: '/',
    redirect: '/home',
    exact: true,
    private: false,
    fallback: <div />
  },
  {
    path: '/home',
    component: lazy(() => import('../components/pages/Home')),
    exact: false,
    private: false,
    fallback: <div />,
    routes: [
      {
        path: '/home/me',
        component: lazy(() => import('../components/organisms/MyInfo')),
        exact: true,
        private: false,
        fallback: <div />
      },
      {
        path: '/home/command',
        component: lazy(() => import('../components/organisms/MyTeam')),
        exact: true,
        private: false,
        fallback: <div />
      },
      {
        path: '/home/history',
        component: lazy(() => import('../components/organisms/HistoryList')),
        exact: true,
        private: false,
        fallback: <div />
      },
      {
        path: '/home/tasks',
        component: lazy(() => import('../components/pages/Tasks')),
        exact: true,
        private: false,
        fallback: <div />
      }
    ]
  },
  {
    path: '/request/:id/:user?/:pid?',
    component: lazy(() => import('../components/pages/Request')),
    exact: true,
    private: false,
    fallback: <div />
  },
  {
    path: '/view/:id',
    component: lazy(() => import('../components/pages/Request')),
    exact: true,
    private: false,
    fallback: <div />
  }
];
