import { ActionTypes } from "./career.actions";
import { Career, CareerMap } from "../../models/career";

interface IState {
  careerMap: CareerMap;
  isLoading: boolean;
  error: any;
}

const initialState = {
  careerMap: {},
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
        careerMap: action.payload.careerList.reduce(
          (total: object, curr: Career) => {
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
