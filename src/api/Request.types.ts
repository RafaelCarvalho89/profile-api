export const REQUEST_METHOD_LIST = ['get', 'post', 'put', 'delete'] as const;

export const RESPONSE_STATUS_MAP = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
} as const;

export type RequestMethodType = (typeof REQUEST_METHOD_LIST)[number];

export type ResponseStatusNameType = keyof typeof RESPONSE_STATUS_MAP;

export type ResponseStatusCodeType = (typeof RESPONSE_STATUS_MAP)[ResponseStatusNameType];

export type RequestType = {
  body?: Record<string, any>;
  headers?: Record<string, any>;
  query?: Record<string, any>;
  params?: Record<string, any>;
};

export type ErrorPresenterType = {
  error: string;
  message: string;
};

export type ResponseBodyType<T> = {
  data: T;
  error?: ErrorPresenterType;
};

export type ResponseType<T> = {
  statusCode: ResponseStatusCodeType;
  body: ResponseBodyType<T>;
};
