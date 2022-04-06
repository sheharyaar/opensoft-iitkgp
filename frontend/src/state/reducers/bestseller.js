import {
  BESTSELLER_BEGIN,
  BESTSELLER_SUCCESS,
  BESTSELLER_FAILURE,
} from "../action-creators/index";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function bestSellerReducer(state = initialState, action) {
  switch (action.type) {
    case BESTSELLER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case BESTSELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products,
      };

    case BESTSELLER_FAILURE:
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
