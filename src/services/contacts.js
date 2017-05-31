/**
 * Created by jiangyh on 17-5-31.
 */
import { request, config } from '../utils';

const { api } = config;
const { contacts } = api;
export async function query(params) {
  return request({
    url: contacts,
    method: 'GET',
    data: params,
  });
}
