import { ActionTypes } from "./admissionPeriod.actions";
import { AdmissionPeriod, AdmissionPeriodMap } from "../../models/admissionPeriod";

interface IState {
  admissionPeriodMap: AdmissionPeriodMap;
  isLoading: boolean;
  error: any;
}

const initialState = {
  admissionPeriodMap: {},
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
        admissionPeriodMap: action.payload.admissionPeriodList.reduce(
          (total: object, curr: AdmissionPeriod) => {
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
