/**
 * Created by jiangyh on 17-5-19.
 */
import { queryUsers } from '../../services/users';

export default {
  namespace: 'user',
  state: {
    list: [],
    currentItem: {},
    advanceSearchOpen: false,
    detailDialogVisible: false,
    detailContentType: 'create',
    detailContentVisible: false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user') {
          dispatch({
            type: 'query',
            payload: location.query || {
              pageSize: 10,
              page: 1,
            },
          });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryUsers, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        });
      }
    },
  },
  reducers: {
    querySuccess(state, action) {
      const { list, pagination } = action.payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
    switchAdvance(state) {
      return {
        ...state,
        advanceSearchOpen: !state.advanceSearchOpen,
      };
    },
    registerUser(state, action) {
      return {
        ...state,
        ...action.payload,
        detailDialogVisible: true,
        detailContentVisible: false,
      };
    },
    showDetail(state) {
      return {
        ...state,
        detailDialogVisible: true,
      };
    },
    closeDetail(state) {
      return {
        ...state,
        detailDialogVisible: false,
      };
    },
    switchDetailContent(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
