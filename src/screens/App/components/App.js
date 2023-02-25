import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom';

import './App.css';

import routes from '../route';
import routeList from 'shared/constants/routes';
import { LazyLoader, RouteWithSubRoutes } from 'shared/components';

function App() {
  const [renderRoutes, changeRenderRoutes] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      changeRenderRoutes(true);
      const script = document.createElement('script');
      script.src = 'https://w.appzi.io/w.js?token=oRI25';
      script.async = true;
      document.body.appendChild(script);
    }, 3000);
  }, []);
  return !renderRoutes ? (
    <LazyLoader />
  ) : (
    <Switch>
      <Route
        exact
        path="/"
        element={<Navigate replace to={routeList.HOME.route} />}
      />
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
        // <Route
        //   path={route.path}
        //   key={route.path}
        //   element={<route.component />}
        // />
      ))}
    </Switch>
  );
}

export default App;
