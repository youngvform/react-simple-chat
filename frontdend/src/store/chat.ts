import shortId from "shortid";
import { actions, ActionTypes } from "./action";
import { createReducer } from "./redux";
import { ChatType } from "../types";

export interface ChatState {
  isLoading: boolean;
  createError: string;
  chatList: ChatType[];
}

const INITIAL_STATE: ChatState = {
  chatList: [],
  createError: "",
  isLoading: false,
};

type Action = ReturnType<typeof actions[keyof typeof actions]>;

export default createReducer<ChatState, ActionTypes, Action>(INITIAL_STATE, {
  [ActionTypes.CREATE_CHAT_REQUEST]: (state, action) => {
    state.isLoading = true;
  },
  [ActionTypes.CREATE_CHAT_SUCCESS]: (state, action) => {
    const { id, name } = action.payload.data;
    console.log({ id, name });
    state.chatList = [...state.chatList, { id, name }];
    state.isLoading = false;
  },
  [ActionTypes.CREATE_CHAT_FAILURE]: (state, action) => {
    state.createError = action.payload.errorMessage;
    state.isLoading = false;
  },
});
