import {
  PLACE_ORDER_BEGIN,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
} from "../action-creators/index";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function placeorderReducer(state = initialState, action) {
  switch (action.type) {
    case PLACE_ORDER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.products,
      };

    case PLACE_ORDER_FAILURE:
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
