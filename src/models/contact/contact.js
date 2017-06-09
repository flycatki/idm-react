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
  },
  effects: {
    *query({ payload }, { call, put }) {
      //payload = parse(location.search.substr(1));
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
      const data = yield call(create, payload);
      if (data.success) {
        yield put({
          type: 'updateCurrentContact',
          payload: {
            currentItem: data.data,
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
      const newContact = { ...payload, id };
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
        currentItem: {},
      };
    },
    updateCurrentContact(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    showDetail(state, action) {
      return {
        ...state,
        ...action.payload,
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
    switchAdvanceSearch(state) {
      return {
        ...state,
        advanceSearchVisible: !state.advanceSearchVisible,
      };
    },
  },
};
