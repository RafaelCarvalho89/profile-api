export const API_ERROR_LIST = [
  'BAD_REQUEST',
  'INTERNAL_SERVER_ERROR',
  'NOT_IMPLEMENTED',
] as const;

export const PARAM_ERROR_LIST = ['INVALID_SIZE', 'INVALID_TYPE', 'MISSING_VALUE'] as const;

export const ERROR_NAME_LIST = [...API_ERROR_LIST, ...PARAM_ERROR_LIST] as const;

export type ErrorNameType = (typeof ERROR_NAME_LIST)[number];

export type ErrorCauseType = (typeof API_ERROR_LIST)[number];

export interface ErrorHandlerInterface extends Error {
  cause: ErrorCauseType;
}
