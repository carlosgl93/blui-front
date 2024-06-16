import { atom } from 'recoil';

export type PaginationModel = {
  pageSize: number;
  page: number;
};

export const paymentsGridPaginationModelState = atom<{
  pageSize: number;
  page: number;
}>({
  key: 'paymentsGridPaginationModelState',
  default: {
    pageSize: 10,
    page: 0,
  },
});
