import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";


export const ConfigureStore = () => {
  const config = {
    key: "root",
    blacklist: ["customer"],
    storage,
    debug: true,
  };

  const store = createStore(
    persistCombineReducers(config, reducers),
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
