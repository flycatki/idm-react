/**
 * Created by jiangyh on 17-5-19.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Filter from './filter';
import List from './list';
import UserDetail from './userDetail';

const User = ({ user, loading, location, dispatch }) => {
  const {
    list,
    pagination,
    currentItem,
    advanceSearchOpen,
    detailDialogVisible,
    detailContentVisible,
    detailContentType,
  } = user;
  const { pageSize } = pagination;
  const filterProps = {
    advanceSearchOpen,
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }));
    },
    switchAdvance() {
      dispatch({ type: 'user/switchAdvance' });
    },
    showDetail() {
      dispatch({ type: 'user/showDetail' });
    },
    registerUser() {
      dispatch({
        type: 'user/registerUser',
        payload: {
          detailContentType: 'create',
        },
      });
    },
  };

  const listProps = {
    dataSource: list,
    pagination,
    loading: loading.effects['user/query'],
    location,
    onChange(page) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }));
    },
  };

  const detailProps = {
    item: detailContentType === 'create' ? {} : currentItem,
    detailContentType,
    detailDialogVisible,
    detailContentVisible,
    closeDetail() {
      dispatch({ type: 'user/closeDetail' });
    },
    switchDetailContent(state) {
      dispatch({
        type: 'user/switchDetailContent',
        payload: {
          detailContentVisible: state,
        },
      });
    },
  };

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      { detailDialogVisible ?
        <UserDetail {...detailProps} />
        : null
      }
    </div>
  );
};

User.PropTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
};

export default connect(({ user, loading }) => ({ user, loading }))(User);
