/**
 * Created by jiangyh on 17-5-31.
 */
import { request, config } from '../utils';

const { api, apiPrefix } = config;
const { contactCreate, contactUpdate } = api;

export async function create(params) {
  return request({
    url: apiPrefix + contactCreate,
    data: params.data,
    cb: params.cb,
    method: 'post',
  });
}

export async function update(params) {
  return request({
    url: apiPrefix + contactUpdate,
    method: 'put',
    data: params.data,
    cb: params.cb,
  });
}
