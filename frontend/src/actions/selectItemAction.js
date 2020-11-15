import { SELECT_ITEM } from './types';

// eslint-disable-next-line import/prefer-default-export
export const selectItemAction = (itemId) => ({
  type: SELECT_ITEM,
  payload: itemId,
});
