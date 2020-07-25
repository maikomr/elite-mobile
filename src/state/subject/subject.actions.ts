import SubjectService from "../../services/SubjectService";
import { Subject } from "../../models/subject";
import { Dispatch } from "redux";

export const ActionTypes = {
  FETCH_ALL_START: "[subject] fetch all start",
  FETCH_ALL_SUCCESS: "[subject] fetch all success",
  SET_ERROR: "[subject] set error",
};

export const fetchAllStart = () => ({
  type: ActionTypes.FETCH_ALL_START,
});

export const fetchAllSuccess = (subjectList: Subject[]) => ({
  type: ActionTypes.FETCH_ALL_SUCCESS,
  payload: { subjectList },
});

export const setError = (error: any) => ({
  type: ActionTypes.SET_ERROR,
  payload: { error },
});

export const fetchAllAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchAllStart());
  try {
    const subjectList = await SubjectService.getAll();
    dispatch(fetchAllSuccess(subjectList));
  } catch (error) {
    dispatch(setError(error));
  }
};
