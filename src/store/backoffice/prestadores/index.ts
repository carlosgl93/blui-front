import { atom } from 'recoil';

export const prestadoresGridPaginationModelState = atom<{
  pageSize: number;
  page: number;
}>({
  key: 'prestadoresGridPaginationModelState',
  default: {
    pageSize: 10,
    page: 0,
  },
});
