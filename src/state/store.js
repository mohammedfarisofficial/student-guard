import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authReducer from "./reducers/authSlice";
import userReducer from './reducers/userSlice'
import modeReducer from './reducers/modeSlice'


const middleware = [thunk]

const reducer = {
  auth: authReducer,
  user: userReducer,
  mode: modeReducer
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  },composeWithDevTools(applyMiddleware(...middleware)));
  
export default store;