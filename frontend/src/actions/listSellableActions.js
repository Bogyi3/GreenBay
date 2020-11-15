import generalFetch from '../utilities/generalFetch';
import {
  LOADING_SELLABLE_STARTED,
  FETCH_SELLABLE_FAIL,
  FETCH_SELLABLE_SUCCESS,
} from './types';

export const loadingSellableAction = () => ({
  type: LOADING_SELLABLE_STARTED,
});

export const fetchSellableAction = (data) => ({
  type: FETCH_SELLABLE_SUCCESS,
  payload: data,
});

export const fetchSellableFailAction = (errorMessage) => ({
  type: FETCH_SELLABLE_FAIL,
  payload: errorMessage,
});

export const getSellable = (token) => async (dispatch) => {
  try {
    dispatch(loadingSellableAction());
    const data = await generalFetch('item/sellable/all', 'GET', undefined, token);
    if (data.response.results) {
      return dispatch(fetchSellableAction(data.response.results));
    }

    throw new Error(data.message || 'Something went wrong');
  } catch (err) {
    dispatch(fetchSellableFailAction({ error: `There was an error: ${err.message}. Please try again!` }));
    return null;
  }
};
