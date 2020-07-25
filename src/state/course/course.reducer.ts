import { ActionTypes } from "./course.actions";
import { Course, CourseMap } from "../../models/course";

interface IState {
  courseMap: CourseMap;
  isLoading: boolean;
  error: any;
}

const initialState = {
  courseMap: {},
  isLoading: false,
  error: null,
};

export default (state: IState = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_START:
      return { ...state, isLoading: true };
    case ActionTypes.FETCH_ALL_SUCCESS:
      return {
        ...state,
        courseMap: action.payload.courseList.reduce(
          (total: object, curr: Course) => {
            return { ...total, [curr.id]: curr };
          },
          {}
        ),
        isLoading: false,
        error: null,
      };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    default:
      return state;
  }
};
