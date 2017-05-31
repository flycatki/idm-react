/**
 * Created by jiangyh on 17-5-26.
 */
import React from 'react';
import { Layout, Icon, Input } from 'antd';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import ContactHeader from './contactHeader';
import ContactList from './contactList';
import ContactDetail from './contactDetail';

const Contact = ({ contact, app, loading, location, dispatch }) => {
  const { siderFold } = app;
  const { list, detailContentVisible, detailDialogVisible } = contact;

  const contactHeaderProps = {
    siderFold,
    toggle() {
      dispatch({ type: 'app/switchSider' });
    },
  };

  const contactListProps = {
    dataSource: list,
    registerContact() {
      dispatch({
        type: 'contact/registerContact',
        payload: {
          modalType: 'create',
        },
      });
    },
  };

  const contactDetailProps = {
    detailContentVisible,
    closeDetail() {
      dispatch({ type: 'contact/closeDetail' });
    },
    switchDetailContent(state) {
      dispatch({
        type: 'contact/switchDetailContent',
        payload: {
          detailContentVisible: state,
        },
      });
    },
  };

  return (
    <div>
      <ContactHeader {...contactHeaderProps} />
      <ContactList {...contactListProps} />
      { detailDialogVisible ?
        <ContactDetail {...contactDetailProps} />
        : null
      }
    </div>
  );
};

Contact.PropTypes = {
  contact: PropTypes.object,
};

export default connect(({ contact, app, loading, }) => ({ contact, app, loading }))(Contact);
