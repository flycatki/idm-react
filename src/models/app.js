/**
 * Created by jiangyh on 17-5-18.
 */

export default {
  namespace: 'app',
  state: {
    siderFold: false,
  },
  subscriptions: {
    setup({ dispatch }) {
      //dispatch({ type: 'query' });
    },
  },
  reducers: {
    switchSider(state) {
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },
  },
};
