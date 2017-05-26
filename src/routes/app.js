/**
 * Created by jiangyh on 17-5-18.
 */
import React from 'react';
import { connect } from 'dva';
import { menu } from '../utils';

import MainLayout from '../components/Layout/MainLayout';

const App = ({ children, location, dispatch, app, loading }) => {
  const { siderFold } = app;

  const mainLayoutProps = {
    menu,
    siderFold,
    children,
    location,
    dispatch,
    toggle() {
      dispatch({ type: 'app/switchSider' });
    },
  };

  return (
    <div>
      <MainLayout {...mainLayoutProps} />
    </div>
  );
};

export default connect(({ app, loading }) => ({ app, loading }))(App);
