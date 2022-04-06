import {
  ORDER_BEGIN,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from "../action-creators/index";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products,
      };

    case ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };

    default:
      return state;
  }
}
