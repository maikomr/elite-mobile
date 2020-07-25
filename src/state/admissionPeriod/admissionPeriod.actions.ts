import AdmissionPeriodService from "../../services/AdmissionPeriodService";
import { AdmissionPeriod } from "../../models/admissionPeriod";
import { Dispatch } from "redux";

export const ActionTypes = {
  FETCH_ALL_START: "[admissionPeriod] fetch all start",
  FETCH_ALL_SUCCESS: "[admissionPeriod] fetch all success",
  SET_ERROR: "[admissionPeriod] set error",
};

export const fetchAllStart = () => ({
  type: ActionTypes.FETCH_ALL_START,
});

export const fetchAllSuccess = (admissionPeriodList: AdmissionPeriod[]) => ({
  type: ActionTypes.FETCH_ALL_SUCCESS,
  payload: { admissionPeriodList },
});

export const setError = (error: any) => ({
  type: ActionTypes.SET_ERROR,
  payload: { error },
});

export const fetchAllAsync = () => async (dispatch: Dispatch) => {
  dispatch(fetchAllStart());
  try {
    const admissionPeriodList = await AdmissionPeriodService.getAll();
    dispatch(fetchAllSuccess(admissionPeriodList));
  } catch (error) {
    dispatch(setError(error));
  }
};
