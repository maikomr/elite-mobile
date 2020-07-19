import { ActionTypes } from "./categories.actions";
import { ICategory, ICategoryMap } from "../../models/category";

interface IState {
  categoryMap: ICategoryMap;
  isLoading: boolean;
  error: any;
}

const initialState = {
  categoryMap: {},
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
        categoryMap: action.payload.categoryList.reduce(
          (total: object, curr: ICategory) => {
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
