import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING_STARTED,
  LOG_OUT,
} from '../actions/types';

const initialState = {
  loading: false,
  id: null,
  username: null,
  token: null,
  userType: null,
  firstName: null,
  lastName: null,
  email: null,
  profileImg: null,
  money: null,
  errorMessage: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        id: action.payload.id,
        username: action.payload.username,
        token: action.payload.token,
        userType: action.payload.userType,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        profileImg: action.payload.profileImg,
        money: action.payload.money,
        errorMessage: '',
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        id: null,
        username: null,
        token: null,
        userType: null,
        firstName: null,
        lastName: null,
        email: null,
        profileImg: null,
        money: null,
        errorMessage: action.payload.error,
      };

    case LOG_OUT:
      return {
        ...state,
        loading: false,
        id: null,
        username: null,
        token: null,
        userType: null,
        firstName: null,
        lastName: null,
        email: null,
        profileImg: null,
        money: null,
        phone: null,
        errorMessage: '',
      };

    default: return state;
  }
};

export default loginReducer;
