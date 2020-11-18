import generalFetch from '../utilities/generalFetch';
import {
  LOADING_SINGLE_USER,
  FETCH_SINGLE_USER_SUCCESS,
  FETCH_SINGLE_USER_FAIL,
} from './types';

export const loadingUserAction = () => ({
  type: LOADING_SINGLE_USER,
});

export const fetchUserAction = (data) => ({
  type: FETCH_SINGLE_USER_SUCCESS,
  payload: data,
});

export const fetchUserFailAction = (errorMessage) => ({
  type: FETCH_SINGLE_USER_FAIL,
  payload: errorMessage,
});

export const getUserData = (username, token) => async (dispatch) => {
  try {
    dispatch(loadingUserAction());
    const data = await generalFetch(`user/${username}`, 'GET', undefined, token);
    if (data.response.results) {
      return dispatch(fetchUserAction(data.response.results));
    }
    if (data.response.message === 'jwt malformed') {
      throw new Error('Please sign in or register to continue.');
    }
    throw new Error(data.response.message || 'Something went wrong');
  } catch (err) {
    dispatch(fetchUserFailAction({ error: `There was an error: ${err.message}` }));
    return null;
  }
};
