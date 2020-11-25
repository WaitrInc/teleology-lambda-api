/* eslint-disable no-param-reassign */
import request from './request';
import response from './response';

export default (fn) => async (event) => {
  try {
    const { body = {}, headers = {} } = (await fn(request(event))) ?? {};
    return response({
      code: 200,
      headers,
      body: body,
    });
  } catch (e) {
    return response({
      code: e.code ?? 500,
      body: e.toString(),
    });
  }
};
