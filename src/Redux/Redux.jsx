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
        result?.data?.message &&
          dispatchToast(dispatch, "success", result?.data?.message);
        dispatchError(dispatch, "theme", undefined);
      } else elseHandler(dispatch, "theme", result?.data);
      dispatchLoading(dispatch, "theme", false);
    })
    .catch((err) => {
      // dispatchToast(dispatch, "error", err?.response?.data?.message);
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
        dispatchToast(dispatch, "success", "Theme Added Successfully");
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
        dispatchToast(dispatch, "success", "Theme Updated Successfully");
        dispatchError(dispatch, "updateTheme", undefined);
      } else elseHandler(dispatch, "updateTheme", result?.data);
      dispatchLoading(dispatch, "updateTheme", false);
    })
    .catch((err) => {
      dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "updateTheme", false);
    });
};

export const DeleteTheme = (id, setState) => async (dispatch) => {
  dispatchLoading(dispatch, "deleteTheme", true);
  axios
    .delete(`${API_URL}/themes/${id}`)
    .then((result) => {
      if (result?.status) {
        setState && setState();
        dispatchToast(dispatch, "success", "Theme Deleted Successfully");
        dispatchError(dispatch, "deleteTheme", undefined);
      } else elseHandler(dispatch, "deleteTheme", result?.data);
      dispatchLoading(dispatch, "deleteTheme", false);
    })
    .catch((err) => {
      dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "deleteTheme", false);
    });
};

export const GetPackage = (body, setState) => async (dispatch) => {
  dispatchLoading(dispatch, "package", true);
  axios
    .post(`${API_URL}/packages/filter`, body)
    .then((result) => {
      if (result?.status) {
        setState && setState();
        dispatch({ type: "GET_PACKAGE", payload: result?.data });
        dispatchError(dispatch, "package", undefined);
      } else elseHandler(dispatch, "package", result?.data);
      dispatchLoading(dispatch, "package", false);
    })
    .catch((err) => {
      // dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "package", false);
    });
};

export const GetPackageId = (id, setState) => async (dispatch) => {
  dispatchLoading(dispatch, "package", true);
  axios
    .get(`${API_URL}/packages/${id}`)
    .then((result) => {
      if (result?.status) {
        setState && setState(result?.data);
        dispatch({ type: "GET_PACKAGE_DETAIL", payload: result?.data });
        result?.data?.message &&
          dispatchToast(dispatch, "success", result?.data?.message);
        dispatchError(dispatch, "package", undefined);
      } else elseHandler(dispatch, "package", result?.data);
      dispatchLoading(dispatch, "package", false);
    })
    .catch((err) => {
      dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "package", false);
    });
};

export const AddPackage = (body, setState) => async (dispatch) => {
  dispatchLoading(dispatch, "addPackage", true);
  axios
    .post(`${API_URL}/packages`, body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((result) => {
      if (result?.status) {
        setState && setState();
        dispatchToast(dispatch, "success", "Package Added Successfully");
        dispatchError(dispatch, "addPackage", undefined);
      } else elseHandler(dispatch, "addPackage", result?.data);
      dispatchLoading(dispatch, "addPackage", false);
    })
    .catch((err) => {
      dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "addPackage", false);
    });
};

export const UpdatePackage = (id, body, setState) => async (dispatch) => {
  dispatchLoading(dispatch, "updatePackage", true);
  axios
    .put(`${API_URL}/packages/${id}`, body, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((result) => {
      if (result?.status) {
        setState && setState();
        dispatchToast(dispatch, "success", "Package Updated Successfully");
        dispatchError(dispatch, "updatePackage", undefined);
      } else elseHandler(dispatch, "updatePackage", result?.data);
      dispatchLoading(dispatch, "updatePackage", false);
    })
    .catch((err) => {
      dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "updatePackage", false);
    });
};

export const DeletePackage = (id, setState) => async (dispatch) => {
  dispatchLoading(dispatch, "deletePackage", true);
  axios
    .delete(`${API_URL}/packages/${id}`)
    .then((result) => {
      if (result?.status) {
        setState && setState();
        dispatchToast(dispatch, "success", "Package Deleted Successfully");
        dispatchError(dispatch, "deletePackage", undefined);
      } else elseHandler(dispatch, "deletePackage", result?.data);
      dispatchLoading(dispatch, "deletePackage", false);
    })
    .catch((err) => {
      dispatchToast(dispatch, "error", err?.response?.data?.message);
      dispatchLoading(dispatch, "deletePackage", false);
    });
};
