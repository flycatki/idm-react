import React from 'react';
import { Router, Route } from 'dva/router';
import App from './routes/app';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/dashboard'));
          cb(null, { component: require('./routes/dashboard') });
        }, 'dashboard');
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dashboard'));
              cb(null, require('./routes/dashboard'));
            }, 'dashboard');
          },
        },
        {
          path: 'user',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/user/user'));
              cb(null, require('./routes/user'));
            }, 'user');
          },
        },
        {
          path: 'contact',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/contact/contact'));
              registerModel(app, require('./models/app'));
              cb(null, require('./routes/contact'));
            }, 'contact');
          },
        },
      ],
    },
  ];

  return <Router history={history} routes={routes} />;
};


export default Routers;
