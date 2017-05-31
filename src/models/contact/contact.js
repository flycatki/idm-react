/**
 * Created by jiangyh on 17-5-26.
 */
import { create, query } from '../../services/contacts';
import { parse } from 'qs'

export default {
  namespace: 'contact',
  state: {
    detailContentVisible: false,
    detailDialogVisible: false,
    modalType: 'create',
  },
  effects: {
    *query({ payload }, { call, put }) {
      payload = parse(location.search.substr(1));
      const data = yield call(query, payload);

    },
    *create({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.success) {
        yield put({ type: 'query' });
      }
    },
  },
  reducers: {
    registerContact(state, action) {
      return {
        ...state,
        ...action.payload,
        detailContentVisible: false,
        detailDialogVisible: true,
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
