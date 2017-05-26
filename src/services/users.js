/**
 * Created by jiangyh on 17-5-19.
 */
import { request, config } from '../utils';

const { api } = config;
const { users } = api;

export async function queryUsers(params) {

  const newParams = {
    pageSize: params.pageSize || 10,
    page: params.page || 1,
    ...params,
  };

  return request({
    url: users,
    data: newParams,
    method: 'GET',
  });
}
