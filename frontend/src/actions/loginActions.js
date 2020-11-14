import generalFetch from '../utilities/generalFetch';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADING_STARTED,
  LOG_OUT,
} from './types';

export const loadingStartedAction = () => ({
  type: LOADING_STARTED,
});

export const setLoginSuccessAction = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const setLoginFailAction = (errorMessage) => ({
  type: LOGIN_FAIL,
  payload: errorMessage,
});

export const logOutAction = () => ({
  type: LOG_OUT,
});

export const getUserData = (loginObject) => {
  const body = {
    username: loginObject.username,
    password: loginObject.password,
  };
  return async (dispatch) => {
    try {
      dispatch(loadingStartedAction());
      const data = await generalFetch('sessions', 'POST', body);

      if (data.response.token && data.response.username && data.response.userType) {
        dispatch(setLoginSuccessAction(data.response));
        return 'success';
      }
      throw new Error(data.response.message || 'Something went wrong');
    } catch (err) {
      dispatch(setLoginFailAction({ error: `${err.message} Please try again!` }));
      return null;
    }
  };
};
