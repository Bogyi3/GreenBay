import {
  LOADING_SELLABLE_STARTED,
  FETCH_SELLABLE_FAIL,
  FETCH_SELLABLE_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: false,
  errorMessage: '',
  sellableList: '',
};

const listSellableReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SELLABLE_STARTED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SELLABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        sellableList: action.payload,
        errorMessage: '',
      };

    case FETCH_SELLABLE_FAIL:
      return {
        ...state,
        loading: false,
        sellableList: null,
        errorMessage: action.payload.error,
      };

    default: return state;
  }
};

export default listSellableReducer;
