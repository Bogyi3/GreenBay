import {
  LOADING_SINGLE_USER,
  FETCH_SINGLE_USER_SUCCESS,
  FETCH_SINGLE_USER_FAIL,
} from '../actions/types';

const initialState = {
  loading: false,
  errorMessage: '',
  userData: {},
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SINGLE_USER:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload[0],
        errorMessage: '',
      };

    case FETCH_SINGLE_USER_FAIL:
      return {
        ...state,
        loading: false,
        userData: {},
        errorMessage: action.payload.error,
      };

    default: return state;
  }
};

export default userDataReducer;
