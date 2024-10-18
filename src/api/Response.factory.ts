import { RESPONSE_STATUS_MAP, ResponseStatusNameType } from './Request.types';

export const apiResponseFactory = (status: ResponseStatusNameType, body: any) => ({
  statusCode: RESPONSE_STATUS_MAP[status],
  body,
});
