import { ActionTypes } from "./subject.actions";
import { Subject, SubjectMap } from "../../models/subject";

interface IState {
  subjectMap: SubjectMap;
  isLoading: boolean;
  error: any;
}

const initialState = {
  subjectMap: {},
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
        subjectMap: action.payload.subjectList.reduce(
          (total: object, curr: Subject) => {
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
