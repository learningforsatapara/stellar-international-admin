import { combineReducers, configureStore } from "@reduxjs/toolkit";

const errorReducer = (
  state = { authError: undefined, carError: undefined },
  action
) => {
  switch (action.type) {
    case "SET_ERROR":
      const temp = {};
      const { payload } = action;

      if (payload.status && payload.status.length) {
        payload.status &&
          payload?.status.forEach((ele) => {
            if (ele.param === "_error") {
              ele.nestedErrors?.forEach((ele1) => {
                const key = ele1.param.split(".").pop();
                temp[key] = ele1.msg;
              });
            } else if (ele.param?.includes("updates.")) {
              const key = ele.param.split(".").slice(1).join(".");
              temp[key] = ele.msg;
            } else {
              temp[ele.path] = ele.msg;
            }
          });
      }

      return { ...state, [`${payload.scope}Error`]: temp };

    default:
      return state;
  }
};

const loadingReducer = (state = { authLoading: false }, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return Object.assign({}, state, {
        [`${action.payload.scope}Loading`]: action.payload.status,
      });
    default:
      return state;
  }
};

const msgReducer = (
  state = { success: undefined, error: undefined },
  action
) => {
  switch (action.type) {
    case "SET_TOAST":
      return Object.assign({}, state, {
        [`${action.payload.scope}`]:
          action.payload.status || "Something went wrong!",
      });
    case "CLEAR_TOAST":
      return { ...state, error: undefined, success: undefined };
    default:
      return state;
  }
};

const ThemeReducer = (
  state = {
    theme: [],
  },
  action
) => {
  switch (action.type) {
    case "GET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "CLEAR_DATA":
      return {
        ...state,
        theme: {},
      };
    default:
      return state;
  }
};

const PacakgeReducer = (
  state = {
    packages: [],
    packageDetail: {},
  },
  action
) => {
  switch (action.type) {
    case "GET_PACKAGE":
      return {
        ...state,
        packages: action.payload,
      };
    case "GET_PACKAGE_DETAIL":
      return {
        ...state,
        packageDetail: action.payload,
      };
    case "CLEAR_DATA":
      return {
        ...state,
        theme: {},
      };
    default:
      return state;
  }
};

const HeroReducer = (
  state = {
    hero: [],
  },
  action
) => {
  switch (action.type) {
    case "GET_HERO":
      return {
        ...state,
        hero: action.payload,
      };
    case "CLEAR_DATA":
      return {
        ...state,
        hero: [],
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: combineReducers({
    error: errorReducer,
    loading: loadingReducer,
    msg: msgReducer,
    theme: ThemeReducer,
    package: PacakgeReducer,
    hero: HeroReducer,
  }),
});

export default store;
