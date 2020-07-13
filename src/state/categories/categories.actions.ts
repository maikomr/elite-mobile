import CategoryService from "../../services/CategoryService";
import { ICategory } from "../../models/category";
import { Dispatch } from "redux";

export const ActionTypes = {
  FETCH_ALL_START: "[categories] fetch all start",
  FETCH_ALL_SUCCESS: "[categories] fetch all success",
  SET_ERROR: "[categories] set error",
};

export const fetchAllStart = () => ({
  type: ActionTypes.FETCH_ALL_START,
});

export const fetchAllSuccess = (categoryList: ICategory[]) => ({
  type: ActionTypes.FETCH_ALL_SUCCESS,
  payload: { categoryList },
});

export const setError = (error: any) => ({
  type: ActionTypes.SET_ERROR,
  error,
});

export const fetchAllAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchAllStart());
  try {
    const categoryList = await CategoryService.getAll();
    dispatch(fetchAllSuccess(categoryList));
  } catch (error) {
    dispatch(setError(error));
  }
};
