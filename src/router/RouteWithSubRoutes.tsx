import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IRoute } from './config';

const RouteWithSubRoutes = (route: IRoute) => {
  const authenticated: boolean = true; //useSelector((store: IStore) => store.auth.authenticated);

  const renderRoute = (route: IRoute, props: any) => {
    if (route.redirect) return <Redirect to={route.redirect} />;

    if ((route.private && authenticated) || !route.private) {
      return route.component && <route.component {...props} routes={route.routes} />;
    }

    return <> </>;
  };

  return (
    <Suspense fallback={route.fallback}>
      <Route path={route.path} render={(props: any) => renderRoute(route, props)} />
    </Suspense>
  );
};

export default RouteWithSubRoutes;
