/**
 * Created by jiangyh on 17-5-31.
 */
import { request, config } from '../utils';

const { api } = config;
const { contactCreate, contactUpdate } = api;

export async function create(params) {
  return request({
    url: contactCreate,
    data: params,
    method: 'post',
  });
}

export async function update(params) {
  return request({
    url: contactUpdate,
    method: 'patch',
    data: params,
  });
}
