import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createSagaMiddleware from "redux-saga";
import chat, { ChatState } from "./chat";

export interface RootState {
  chat: ChatState;
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const reducer = combineReducers<RootState>({ chat });

export const store = createStore(reducer, enhancer);
