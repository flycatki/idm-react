/**
 * Created by jiangyh on 17-5-31.
 */
import { request, config } from '../utils';

const { api } = config;
const { contactCreate } = api;

export async function create(params) {
  return request({
    url: contactCreate,
    data: params,
    method: 'POST',
  });
}
