import { ActionTypes } from "./categories.actions";
import { ICategory } from "../../models/category";

interface IState {
  categoryList: ICategory[];
  isLoading: boolean;
  error: any;
}

const initialState = {
  categoryList: [],
  isLoading: false,
  error: null,
};

export default (state: IState = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_START:
      return { ...state, isLoading: true };
    case ActionTypes.FETCH_ALL_SUCCESS:
      return { ...state, categoryList: action.payload.categoryList, isLoading: false, error: null };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload.error, isLoading: false };
    default:
      return state;
  }
};
