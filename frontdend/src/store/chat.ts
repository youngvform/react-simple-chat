import { actions, ActionTypes } from "./action";
import { createReducer } from "./redux";
import { ChatType, MessageType } from "../types";

export interface ChatState {
  isChatLoading: boolean;
  isMessageLoading: boolean;
  isChatCreated: boolean;
  isMessageSent: boolean;
  createError: string;
  getChatsError: string;
  messagingError: string;
  chatList: ChatType[];
  messages: MessageType[];
}

const INITIAL_STATE: ChatState = {
  chatList: [],
  createError: "",
  isChatLoading: false,
  isChatCreated: false,
  isMessageLoading: false,
  isMessageSent: false,
  getChatsError: "",
  messagingError: "",
  messages: [],
};

type Action = ReturnType<typeof actions[keyof typeof actions]>;

export default createReducer<ChatState, ActionTypes, Action>(INITIAL_STATE, {
  [ActionTypes.CREATE_CHAT_REQUEST]: (state) => {
    state.isChatLoading = true;
    state.isChatCreated = false;
  },
  [ActionTypes.CREATE_CHAT_SUCCESS]: (state, action) => {
    const { id, name } = action.payload.chat;
    state.chatList.push({ id, name });
    state.isChatLoading = false;
    state.isChatCreated = true;
    state.createError = "";
  },
  [ActionTypes.CREATE_CHAT_FAILURE]: (state, action) => {
    state.createError = action.payload.errorMessage;
    state.isChatLoading = false;
  },
  [ActionTypes.GET_CHATS_REQUEST]: (state) => {
    state.isChatLoading = true;
    state.isChatCreated = false;
    state.isMessageSent = false;
  },
  [ActionTypes.GET_CHATS_SUCCESS]: (state, action) => {
    const { chats } = action.payload;
    state.chatList = chats;
    state.isChatLoading = false;
    state.getChatsError = "";
  },
  [ActionTypes.GET_CHATS_FAILURE]: (state, action) => {
    state.getChatsError = action.payload.errorMessage;
    state.isChatLoading = false;
  },
  [ActionTypes.GET_MESSAGES_REQUEST]: (state) => {
    state.isMessageLoading = true;
    state.isChatCreated = false;
  },
  [ActionTypes.GET_MESSAGES_SUCCESS]: (state, action) => {
    const { messages } = action.payload;
    state.messages = messages;
    state.isMessageLoading = false;
    state.messagingError = "";
  },
  [ActionTypes.GET_MESSAGES_FAILURE]: (state, action) => {
    state.messagingError = action.payload.errorMessage;
    state.isMessageLoading = false;
  },
  [ActionTypes.SEND_MESSAGE_REQUEST]: (state) => {
    state.isMessageLoading = true;
    state.isMessageSent = false;
  },
  [ActionTypes.SEND_MESSAGE_SUCCESS]: (state, action) => {
    const { message } = action.payload;
    state.messages.push({ ...message, isMine: true });
    state.isMessageLoading = false;
    state.messagingError = "";
    state.isMessageSent = true;
  },
  [ActionTypes.SEND_MESSAGE_FAILURE]: (state, action) => {
    state.messagingError = action.payload.errorMessage;
    state.isMessageLoading = false;
  },
  [ActionTypes.ADD_CHAT]: (state, action) => {
    state.chatList.push(action.payload.chat);
  },
  [ActionTypes.ADD_MESSAGE]: (state, action) => {
    state.messages.push(action.payload.message);
  },
  [ActionTypes.RESET_SENT_STATUS]: (state) => {
    state.isMessageSent = false;
  },
});
