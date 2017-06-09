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
  const {
    list, currentItem, detailContentVisible,
    detailDialogVisible, modalType, pagination,
    advanceSearchVisible,
  } = contact;
  const { pageSize } = pagination;
  const registerContact = () => {
    dispatch({
      type: 'contact/registerContact',
      payload: {
        modalType: 'create',
      },
    });
  };

  const switchDetailContent = (state) => {
    dispatch({
      type: 'contact/switchDetailContent',
      payload: {
        detailContentVisible: state,
      },
    });
  };

  const contactHeaderProps = {
    siderFold,
    advanceSearchVisible,
    toggle() {
      dispatch({ type: 'app/switchSider' });
    },
    switchAdvance() {
      dispatch({ type: 'contact/switchAdvanceSearch' });
    },
    registerContact,
    onFilterChange(value) {
      dispatch({
        type: 'contact/query',
        payload: value,
      });
    },
  };

  const contactListProps = {
    dataSource: list,
    registerContact,
    loading: loading.effects['contact/query'],
    pagination,
    location,
    onChange(page) {
      dispatch({
        type: 'contact/query',
        payload: {
          page: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    onEditItem(item) {
      dispatch({
        type: 'contact/showDetail',
        payload: {
          currentItem: item,
          modalType: 'update',
        },
      });
    },
  };

  const contactDetailProps = {
    item: modalType === 'create' ? {} : currentItem,
    detailContentVisible,
    onOk(data) {
      dispatch({
        type: `contact/${modalType}`,
        payload: data,
      });
    },
    closeDetail() {
      dispatch({ type: 'contact/closeDetail' });
    },
    switchDetailContent,
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

export default connect(({ contact, app, loading }) => ({ contact, app, loading }))(Contact);
