import { ActionTypes } from "./faculty.actions";
import { Faculty, FacultyMap } from "../../models/faculty";

interface IState {
  facultyMap: FacultyMap;
  isLoading: boolean;
  error: any;
}

const initialState = {
  facultyMap: {},
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
        facultyMap: action.payload.facultyList.reduce(
          (total: object, curr: Faculty) => {
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
