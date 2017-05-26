/**
 * Created by jiangyh on 17-5-26.
 */
import React from 'react';
import { Layout, Icon } from 'antd';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import styles from '../../components/Layout/MainLayout.less';
import ContactList from './contactList';
const { Header } = Layout;

const Contact = ({ contact, app, loading, location, dispatch }) => {
  const { siderFold } = app;
  const toggle = () => {
    dispatch({ type: 'app/switchSider' });
  };
  return (
    <div>
      <Header className={styles.header}>
        <Icon
          className={styles.trigger}
          onClick={toggle}
          type={siderFold ? 'menu-unfold' : 'menu-fold'}
        />
      </Header>
      <ContactList />
    </div>
  );
};

Contact.PropTypes = {
  contact: PropTypes.object,
};

export default connect(({ contact, app, loading, location, dispatch }) => ({ contact, app, loading, location, dispatch }))(Contact);
