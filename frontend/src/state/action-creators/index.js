import baseUrl from "../urls";

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.status);
  }
  return response;
}

export function getStores(city) {
  return (dispatch) => {
    dispatch(fetchProductsBegin());
    return fetch(`${baseUrl}/stores/GetStores?city=${city}`, {
      method: "GET",
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchProductsSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchProductsFailure(error)));
  };
}

export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products },
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error },
});

export function Customers(username, phone, email, password, address, city) {
  return (dispatch) => {
    dispatch(CustomerBegin());
    return fetch(`${baseUrl}/customers/AddCustomer`, {
      method: "POST",
      body: JSON.stringify({
        full_name: username,
        phone: phone,
        email: email,
        password: password,
        street: address,
        city: city,
        state: "West Bengal",
        pincode: 721302,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(CustomerSuccess(json));
        return json;
      })
      .catch((error) => dispatch(CustomerFailure(error)));
  };
}

export const CUSTOMER_BEGIN = "CUSTOMER_BEGIN";
export const CUSTOMER_SUCCESS = "CUSTOMER_SUCCESS";
export const CUSTOMER_FAILURE = "CUSTOMER_FAILURE";

export const CustomerBegin = () => ({
  type: CUSTOMER_BEGIN,
});

export const CustomerSuccess = (products) => ({
  type: CUSTOMER_SUCCESS,
  payload: { products },
});

export const CustomerFailure = (error) => ({
  type: CUSTOMER_FAILURE,
  payload: { error },
});

export function getItems() {
  return (dispatch) => {
    dispatch(fetchItemsBegin());
    return fetch(`${baseUrl}/items/GetItemById?item_id=0`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchItemsSuccess(json));
        return json;
      })
      .catch((error) => dispatch(fetchItemsFailure(error)));
  };
}

export const FETCH_ITEMS_BEGIN = "FETCH_ITEMS_BEGIN";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

export const fetchItemsBegin = () => ({
  type: FETCH_ITEMS_BEGIN,
});

export const fetchItemsSuccess = (products) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: { products },
});

export const fetchItemsFailure = (error) => ({
  type: FETCH_ITEMS_FAILURE,
  payload: { error },
});

export function getOrders(customer_id) {
  return (dispatch) => {
    dispatch(getOrderBegin());
    return fetch(`${baseUrl}/orders/GetOrders`, {
      method: "POST",
      body: JSON.stringify({
        customer_id: customer_id,
        order_id: 0,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(getOrderSuccess(json));
        return json;
      })
      .catch((error) => dispatch(getOrderFailure(error)));
  };
}

export const ORDER_BEGIN = "ORDER_BEGIN";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILURE = "ORDER_FAILURE";

export const getOrderBegin = () => ({
  type: ORDER_BEGIN,
});

export const getOrderSuccess = (products) => ({
  type: ORDER_SUCCESS,
  payload: { products },
});

export const getOrderFailure = (error) => ({
  type: ORDER_FAILURE,
  payload: { error },
});

export function placeOrders(order) {
  return (dispatch) => {
    dispatch(placeOrderBegin());
    return fetch(`${baseUrl}/orders/PlaceOrder`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(placeOrderSuccess(json));
        return json;
      })
      .catch((error) => dispatch(placeOrderFailure(error)));
  };
}

export const PLACE_ORDER_BEGIN = "PLACE_ORDER_BEGIN";
export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILURE = "PLACE_ORDER_FAILURE";

export const placeOrderBegin = () => ({
  type: PLACE_ORDER_BEGIN,
});

export const placeOrderSuccess = (products) => ({
  type: PLACE_ORDER_SUCCESS,
  payload: { products },
});

export const placeOrderFailure = (error) => ({
  type: PLACE_ORDER_FAILURE,
  payload: { error },
});

export function getBestSeller() {
  return (dispatch) => {
    dispatch(BestSellerBegin());
    return fetch(`${baseUrl}/nonEssentials/Recommend`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(BestSellerSuccess(json));
        return json;
      })
      .catch((error) => dispatch(BestSellerFailure(error)));
  };
}

export const BESTSELLER_BEGIN = "BESTSELLER_BEGIN";
export const BESTSELLER_SUCCESS = "BESTSELLER_SUCCESS";
export const BESTSELLER_FAILURE = "BESTSELLER_FAILURE";

export const BestSellerBegin = () => ({
  type: BESTSELLER_BEGIN,
});

export const BestSellerSuccess = (products) => ({
  type: BESTSELLER_SUCCESS,
  payload: { products },
});

export const BestSellerFailure = (error) => ({
  type: BESTSELLER_FAILURE,
  payload: { error },
});

export function Login(email, password) {
  return (dispatch) => {
    dispatch(LoginBegin());
    return fetch(`${baseUrl}/customers/Login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(LoginSuccess(json));
        return json;
      })
      .catch((error) => {
        dispatch(LoginFailure(error))
      });
  };
}

export function LogoutUser() {
  return (dispatch) => {
    dispatch(Logout());
  };
}
export const LOGIN_BEGIN = "LOGIN_BEGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const LoginBegin = () => ({
  type: LOGIN_BEGIN,
});

export const LoginSuccess = (products) => ({
  type: LOGIN_SUCCESS,
  payload: { products },
});

export const LoginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const Logout = () => ({
  type: LOGOUT,
});

export function Vendors(store_id, password) {
  return (dispatch) => {
    dispatch(VendorBegin());
    return fetch(`${baseUrl}/vendors/VendorLogin`, {
      method: "POST",
      body: JSON.stringify({
        store_id: store_id,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .then((json) => {
        dispatch(VendorSuccess(json));
        return json;
      })
      .catch((error) => dispatch(VendorFailure(error)));
  };
}

export const VENDOR_BEGIN = "VENDOR_BEGIN";
export const VENDOR_SUCCESS = "VENDOR_SUCCESS";
export const VENDOR_FAILURE = "VENDOR_FAILURE";

export const VendorBegin = () => ({
  type: VENDOR_BEGIN,
});

export const VendorSuccess = (products) => ({
  type: VENDOR_SUCCESS,
  payload: { products },
});

export const VendorFailure = (error) => ({
  type: VENDOR_FAILURE,
  payload: { error },
});
