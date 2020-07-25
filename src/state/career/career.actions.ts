import CareerService from "../../services/CareerService";
import { Career } from "../../models/career";
import { Dispatch } from "redux";

export const ActionTypes = {
  FETCH_ALL_START: "[career] fetch all start",
  FETCH_ALL_SUCCESS: "[career] fetch all success",
  SET_ERROR: "[career] set error",
};

export const fetchAllStart = () => ({
  type: ActionTypes.FETCH_ALL_START,
});

export const fetchAllSuccess = (careerList: Career[]) => ({
  type: ActionTypes.FETCH_ALL_SUCCESS,
  payload: { careerList },
});

export const setError = (error: any) => ({
  type: ActionTypes.SET_ERROR,
  payload: { error },
});

export const fetchAllAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchAllStart());
  try {
    const careerList = await CareerService.getAll();
    dispatch(fetchAllSuccess(careerList));
  } catch (error) {
    dispatch(setError(error));
  }
};
