import shortId from "shortid";
import { actions, ActionTypes } from "./action";
import { createReducer } from "./redux";
import { ChatType, MessageType } from "../types";

export interface ChatState {
  isLoading: boolean;
  createError: string;
  getChatsError: string;
  getMessagesError: string;
  chatList: ChatType[];
  messages: MessageType[];
}

const INITIAL_STATE: ChatState = {
  chatList: [],
  createError: "",
  isLoading: false,
  getChatsError: "",
  getMessagesError: "",
  messages: [],
};

type Action = ReturnType<typeof actions[keyof typeof actions]>;

export default createReducer<ChatState, ActionTypes, Action>(INITIAL_STATE, {
  [ActionTypes.CREATE_CHAT_REQUEST]: (state, action) => {
    state.isLoading = true;
  },
  [ActionTypes.CREATE_CHAT_SUCCESS]: (state, action) => {
    const { id, name } = action.payload.chat;
    console.log({ id, name });
    state.chatList.push({ id, name });
    state.isLoading = false;
    state.createError = "";
  },
  [ActionTypes.CREATE_CHAT_FAILURE]: (state, action) => {
    state.createError = action.payload.errorMessage;
    state.isLoading = false;
  },
  [ActionTypes.GET_CHATS_REQUEST]: (state, action) => {
    state.isLoading = true;
  },
  [ActionTypes.GET_CHATS_SUCCESS]: (state, action) => {
    const { chats } = action.payload;
    state.chatList = chats;
    state.isLoading = false;
    state.getChatsError = "";
  },
  [ActionTypes.GET_CHATS_FAILURE]: (state, action) => {
    state.getChatsError = action.payload.errorMessage;
    state.isLoading = false;
  },
  [ActionTypes.GET_MESSAGES_REQUEST]: (state, action) => {
    state.isLoading = true;
  },
  [ActionTypes.GET_MESSAGES_SUCCESS]: (state, action) => {
    const { messages } = action.payload;
    state.messages = messages;
    state.isLoading = false;
    state.getMessagesError = "";
  },
  [ActionTypes.GET_MESSAGES_FAILURE]: (state, action) => {
    state.getMessagesError = action.payload.errorMessage;
    state.isLoading = false;
  },
});
