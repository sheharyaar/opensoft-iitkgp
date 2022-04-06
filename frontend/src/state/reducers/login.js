import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../action-creators/index";

import storage from "redux-persist/lib/storage";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      };

    case LOGOUT:
      storage.removeItem("persist:root");
      return initialState;

    default:
      return state;
  }
}
