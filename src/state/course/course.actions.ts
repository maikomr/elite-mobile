import CourseService from "../../services/CourseService";
import { Course } from "../../models/course";
import { Dispatch } from "redux";

export const ActionTypes = {
  FETCH_ALL_START: "[course] fetch all start",
  FETCH_ALL_SUCCESS: "[course] fetch all success",
  SET_ERROR: "[course] set error",
};

export const fetchAllStart = () => ({
  type: ActionTypes.FETCH_ALL_START,
});

export const fetchAllSuccess = (courseList: Course[]) => ({
  type: ActionTypes.FETCH_ALL_SUCCESS,
  payload: { courseList },
});

export const setError = (error: any) => ({
  type: ActionTypes.SET_ERROR,
  payload: { error },
});

export const fetchAllAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchAllStart());
  try {
    const courseList = await CourseService.getAll();
    dispatch(fetchAllSuccess(courseList));
  } catch (error) {
    dispatch(setError(error));
  }
};
