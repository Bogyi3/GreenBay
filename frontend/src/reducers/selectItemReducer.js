import { SELECT_ITEM } from '../actions/types';

const initialState = {
  selectedItem: '',
};

const selectItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return action.payload;
    default: return state;
  }
};

export default selectItemReducer;
