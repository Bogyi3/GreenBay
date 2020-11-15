import {
  LOADING_SINGLE_ITEM,
  FETCH_SINGLE_ITEM_SUCCESS,
  FETCH_SINGLE_ITEM_FAIL,
} from '../actions/types';

const initialState = {
  loading: false,
  errorMessage: '',
  selectedItem: {},
};

const selectItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SINGLE_ITEM:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SINGLE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedItem: action.payload[0],
        errorMessage: '',
      };

    case FETCH_SINGLE_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        selectedItem: {},
        errorMessage: action.payload.error,
      };

    default: return state;
  }
};

export default selectItemReducer;
