import AdmissionTypeService from "../../services/AdmissionTypeService";
import { AdmissionType } from "../../models/admissionType";
import { Dispatch } from "redux";

export const ActionTypes = {
  FETCH_ALL_START: "[admissionType] fetch all start",
  FETCH_ALL_SUCCESS: "[admissionType] fetch all success",
  SET_ERROR: "[admissionType] set error",
};

export const fetchAllStart = () => ({
  type: ActionTypes.FETCH_ALL_START,
});

export const fetchAllSuccess = (admissionTypeList: AdmissionType[]) => ({
  type: ActionTypes.FETCH_ALL_SUCCESS,
  payload: { admissionTypeList },
});

export const setError = (error: any) => ({
  type: ActionTypes.SET_ERROR,
  payload: { error },
});

export const fetchAllAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchAllStart());
  try {
    const admissionTypeList = await AdmissionTypeService.getAll();
    dispatch(fetchAllSuccess(admissionTypeList));
  } catch (error) {
    dispatch(setError(error));
  }
};
