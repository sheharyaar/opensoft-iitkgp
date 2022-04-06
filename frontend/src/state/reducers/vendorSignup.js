import {
    VENDOR_BEGIN,
    VENDOR_SUCCESS,
    VENDOR_FAILURE,
  } from "../action-creators/index";
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
  };
  
  export default function customerReducer(state = initialState, action) {
    switch (action.type) {
      case VENDOR_BEGIN:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case VENDOR_SUCCESS:
        return {
          ...state,
          loading: false,
          items: action.payload.products,
        };
  
      case VENDOR_FAILURE:
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
  