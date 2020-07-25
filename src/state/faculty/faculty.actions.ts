import FacultyService from "../../services/FacultyService";
import { Faculty } from "../../models/faculty";
import { Dispatch } from "redux";

export const ActionTypes = {
  FETCH_ALL_START: "[faculty] fetch all start",
  FETCH_ALL_SUCCESS: "[faculty] fetch all success",
  SET_ERROR: "[faculty] set error",
};

export const fetchAllStart = () => ({
  type: ActionTypes.FETCH_ALL_START,
});

export const fetchAllSuccess = (facultyList: Faculty[]) => ({
  type: ActionTypes.FETCH_ALL_SUCCESS,
  payload: { facultyList },
});

export const setError = (error: any) => ({
  type: ActionTypes.SET_ERROR,
  payload: { error },
});

export const fetchAllAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchAllStart());
  try {
    const facultyList = await FacultyService.getAll();
    dispatch(fetchAllSuccess(facultyList));
  } catch (error) {
    dispatch(setError(error));
  }
};
