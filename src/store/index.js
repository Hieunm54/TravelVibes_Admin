import { thunk } from "redux-thunk";
import { authDefaultState } from "./auth";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import auth from "../store/auth";
import asyncTaskReducer, { initialAsyncTaskState } from "./reducers/asyncTask";
import events, { eventDefaultState } from "./reducers/events";

const AppInitialState = {
  auth: authDefaultState,
  asyncTaskReducer: initialAsyncTaskState,
  events: eventDefaultState,
};

const DevEnv = import.meta.env.VITE_DEV_ENV;

const configStore = (preloadedState = AppInitialState) => {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  const composedEnhancers =
    DevEnv === "development"
      ? composeWithDevTools(...enhancers)
      : compose(...enhancers);

  const appReducer = combineReducers({
    auth,
    asyncTaskReducer,
    events,
  });

  const store = createStore(appReducer, preloadedState, composedEnhancers);
  return store;
};

export default configStore;
