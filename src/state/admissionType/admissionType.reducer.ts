import { ActionTypes } from "./admissionType.actions";
import { AdmissionType, AdmissionTypeMap } from "../../models/admissionType";

interface IState {
  admissionTypeMap: AdmissionTypeMap;
  isLoading: boolean;
  error: any;
}

const initialState = {
  admissionTypeMap: {},
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
        admissionTypeMap: action.payload.admissionTypeList.reduce(
          (total: object, curr: AdmissionType) => {
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
