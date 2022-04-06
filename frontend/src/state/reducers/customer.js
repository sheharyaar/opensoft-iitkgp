import {
  CUSTOMER_BEGIN,
  CUSTOMER_SUCCESS,
  CUSTOMER_FAILURE,
} from "../action-creators/index";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case CUSTOMER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products,
      };

    case CUSTOMER_FAILURE:
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
