/**
 * Created by jiangyh on 17-5-26.
 */
import { parse } from 'qs';
import { query } from '../../services/contacts';
import { create, update } from '../../services/contact';

export default {
  namespace: 'contact',
  state: {
    list: [],
    currentItem: {},
    advanceSearchVisible: false,
    detailContentVisible: false,
    detailDialogVisible: false,
    modalType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    dialogReverse: false,
    dialogReverseDelay: 0,
    dialogPaused: true,
    dialogMoment: null,
  },
  effects: {
    *query({ payload }, { call, put }) {
      payload = payload || parse(location.search.substr(1));
      const data = yield call(query, payload);
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
    *create({ payload }, { call, put }) {
      const cb = payload.cb || {};
      const data = yield call(create, { data: { ...payload.data }, cb: cb });
      if (data.success) {
        const id = data.data.id || '';
        yield put({
          type: 'updateCurrentContact',
          payload: {
            currentItem: { ...payload.data, id },
            modalType: 'update',
          },
        });
        yield put({ type: 'query' });
      } else {
        throw data;
      }
    },
    *update({ payload }, { select, call, put }) {
      const id = yield select(({ contact }) => contact.currentItem.id);
      const cb = payload.cb || {};
      const newContact = { data: { ...payload.data, id }, cb: cb };
      const data = yield call(update, newContact);
      if (data.success) {
        yield put({ type: 'query' });
      } else {
        throw data;
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
    registerContact(state, action) {
      return {
        ...state,
        ...action.payload,
        detailContentVisible: false,
        detailDialogVisible: true,
        dialogReverse: false,
        dialogReverseDelay: 0,
        dialogPaused: false,
        dialogMoment: null,
        currentItem: {},
      };
    },
    closeContactView(state, action) {
      return {
        ...state,
        ...action.payload,
        detailDialogVisible: false,
        dialogReverse: true,
        dialogReverseDelay: 0,
        dialogPaused: false,
        dialogMoment: null,
      };
    },
    updateCurrentContact(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    showDetail(state, action) {
      if (state.detailDialogVisible === true) {
        return {
          ...state,
          ...action.payload,
          detailDialogVisible: false,
          dialogReverse: true,
          dialogReverseDelay: 0,
          dialogPaused: false,
          dialogMoment: null,
        };
      } else {
        return {
          ...state,
          ...action.payload,
          detailDialogVisible: true,
          dialogReverse: false,
          dialogReverseDelay: 0,
          dialogPaused: false,
          dialogMoment: null,
        };
      }
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
    switchAdvanceSearch(state) {
      return {
        ...state,
        advanceSearchVisible: !state.advanceSearchVisible,
      };
    },
  },
};
