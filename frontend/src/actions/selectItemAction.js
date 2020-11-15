import generalFetch from '../utilities/generalFetch';
import {
  LOADING_SINGLE_ITEM,
  FETCH_SINGLE_ITEM_SUCCESS,
  FETCH_SINGLE_ITEM_FAIL,
} from './types';

export const loadingSingleAction = () => ({
  type: LOADING_SINGLE_ITEM,
});

export const fetchSingleAction = (data) => ({
  type: FETCH_SINGLE_ITEM_SUCCESS,
  payload: data,
});

export const fetchSingleFailAction = (errorMessage) => ({
  type: FETCH_SINGLE_ITEM_FAIL,
  payload: errorMessage,
});

export const getSingle = (id, token) => async (dispatch) => {
  try {
    dispatch(loadingSingleAction());
    const data = await generalFetch(`item/${id}`, 'GET', undefined, token);
    if (data.response.results) {
      return dispatch(fetchSingleAction(data.response.results));
    }
    if (data.response.message === 'jwt malformed') {
      throw new Error('Please sign in or register to continue.');
    }
    throw new Error(data.response.message || 'Something went wrong');
  } catch (err) {
    dispatch(fetchSingleFailAction({ error: `There was an error: ${err.message}` }));
    return null;
  }
};
