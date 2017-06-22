/**
 * Created by jiangyh on 17-5-26.
 */
import React from 'react';
import { Layout, Icon, Input, message } from 'antd';
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
    dialogReverse,
    dialogReverseDelay,
    dialogPaused,
    dialogMoment,
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
          detailContentVisible: true,
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
        payload: {
          data: data,
          cb: updateSuccess,
        },
      });
    },
    onPlay(contactView) {
      contactView.onPlay();
    },
    closeDetail() {
      dispatch({ type: 'contact/closeDetail' });
    },
    switchDetailContent,
    closeContactView() {
      dispatch({ type: 'contact/closeContactView' });
    },
    dialogReverse,
    dialogReverseDelay,
    dialogPaused,
    dialogMoment,
    detailDialogVisible,
  };

  const updateSuccess = () => {
    if (modalType === 'create') {
      message.success('新建成功');
    } else {
      message.success('更新成功');
    }
  };

  return (
    <div>
      <ContactHeader {...contactHeaderProps} />
      <ContactList {...contactListProps} />
      <ContactDetail {...contactDetailProps} />
    </div>
  );
};

Contact.PropTypes = {
  contact: PropTypes.object,
};

export default connect(({ contact, app, loading }) => ({ contact, app, loading }))(Contact);
