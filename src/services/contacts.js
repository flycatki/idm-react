/**
 * Created by jiangyh on 17-5-31.
 */
import { request, config } from '../utils';

const { api, apiPrefix } = config;
const { contacts } = api;
export async function query(params) {
  return request({
    url: apiPrefix + contacts,
    method: 'GET',
    data: params,
  });
}
