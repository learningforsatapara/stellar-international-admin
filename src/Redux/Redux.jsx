import axios from "axios";

import {
  dispatchError,
  dispatchLoading,
  dispatchToast,
  elseHandler,
} from "../helpers/utils";

export const API_URL = import.meta.env.VITE_API_URL;

export const GetTheme = (body, setState) => async (dispatch) => {
  dispatchLoading(dispatch, "theme", true);
  axios
    .get(`${API_URL}/themes`)
    .then((result) => {
      if (result?.status) {
        setState && setState();
        dispatch({ type: "GET_THEME", payload: result?.data });
        dispatchToast(dispatch, "success", result?.data?.message);
        dispatchError(dispatch, "theme", undefined);
      } else elseHandler(dispatch, "theme", result?.data);
      dispatchLoading(dispatch, "theme", false);
    })
    .catch((err) => {
      dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "theme", false);
    });
};

export const AddTheme = (body, setState) => async (dispatch) => {
  dispatchLoading(dispatch, "addTheme", true);
  axios
    .post(`${API_URL}/themes`, body)
    .then((result) => {
      if (result?.status) {
        setState && setState();
        dispatchToast(dispatch, "success", result?.data?.message);
        dispatchError(dispatch, "addTheme", undefined);
      } else elseHandler(dispatch, "addTheme", result?.data);
      dispatchLoading(dispatch, "addTheme", false);
    })
    .catch((err) => {
      dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "addTheme", false);
    });
};

export const UpdateTheme = (id, body, setState) => async (dispatch) => {
  dispatchLoading(dispatch, "updateTheme", true);
  axios
    .put(`${API_URL}/themes/${id}`, body)
    .then((result) => {
      if (result?.status) {
        setState && setState();
        dispatchToast(dispatch, "success", result?.data?.message);
        dispatchError(dispatch, "updateTheme", undefined);
      } else elseHandler(dispatch, "updateTheme", result?.data);
      dispatchLoading(dispatch, "updateTheme", false);
    })
    .catch((err) => {
      dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "updateTheme", false);
    });
};

export const DeletTheme = (id, setState) => async (dispatch) => {
  dispatchLoading(dispatch, "deleteTheme", true);
  axios
    .delete(`${URL}/themes/${id}`)
    .then((result) => {
      if (result?.status) {
        setState && setState();
        dispatchToast(dispatch, "success", result?.data?.message);
        dispatchError(dispatch, "deleteTheme", undefined);
      } else elseHandler(dispatch, "deleteTheme", result?.data);
      dispatchLoading(dispatch, "deleteTheme", false);
    })
    .catch((err) => {
      dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "deleteTheme", false);
    });
};
