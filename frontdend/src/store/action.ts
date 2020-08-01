import { createAction } from "./redux";
import { ChatType, MessageType } from "../types";
import { MessageParam } from "../lib/api";

export enum ActionTypes {
  CREATE_CHAT_REQUEST = "chat/CREATE_CHAT_REQUEST",
  CREATE_CHAT_SUCCESS = "chat/CREATE_CHAT_SUCCESS",
  CREATE_CHAT_FAILURE = "chat/CREATE_CHAT_FAILURE",
  GET_CHATS_REQUEST = "chat/GET_CHATS_REQUEST",
  GET_CHATS_SUCCESS = "chat/GET_CHATS_SUCCESS",
  GET_CHATS_FAILURE = "chat/GET_CHATS_FAILURE",
  GET_MESSAGES_REQUEST = "chat/GET_MESSAGES_REQUEST",
  GET_MESSAGES_SUCCESS = "chat/GET_MESSAGES_SUCCESS",
  GET_MESSAGES_FAILURE = "chat/GET_MESSAGES_FAILURE",
  SEND_MESSAGE_REQUEST = "chat/SEND_MESSAGE_REQUEST",
  SEND_MESSAGE_SUCCESS = "chat/SEND_MESSAGE_SUCCESS",
  SEND_MESSAGE_FAILURE = "chat/SEND_MESSAGE_FAILURE",
  ADD_CHAT = "chat/ADD_CHAT",
  ADD_MESSAGE = "chat/ADD_MESSAGE",
  RESET_SENT_STATUS = "chat/RESET_SENT_STATUS",
}

export const actions = {
  createChatRequest: (chatName: string) =>
    createAction(ActionTypes.CREATE_CHAT_REQUEST, { chatName }),
  createChatSuccess: (chat: ChatType) =>
    createAction(ActionTypes.CREATE_CHAT_SUCCESS, { chat }),
  createChatFailure: (errorMessage: string) =>
    createAction(ActionTypes.CREATE_CHAT_FAILURE, { errorMessage }),
  getChatsRequest: () => createAction(ActionTypes.GET_CHATS_REQUEST),
  getChatsSuccess: (chats: ChatType[]) =>
    createAction(ActionTypes.GET_CHATS_SUCCESS, { chats }),
  getChatsFailure: (errorMessage: string) =>
    createAction(ActionTypes.GET_CHATS_FAILURE, { errorMessage }),
  getMessagesRequest: (chatId: string) =>
    createAction(ActionTypes.GET_MESSAGES_REQUEST, { chatId }),
  getMessagesSuccess: (messages: MessageType[]) =>
    createAction(ActionTypes.GET_MESSAGES_SUCCESS, { messages }),
  getMessagesFailure: (errorMessage: string) =>
    createAction(ActionTypes.GET_MESSAGES_FAILURE, { errorMessage }),
  sendMessageRequest: (params: MessageParam) =>
    createAction(ActionTypes.SEND_MESSAGE_REQUEST, { params }),
  sendMessageSuccess: (message: MessageType) =>
    createAction(ActionTypes.SEND_MESSAGE_SUCCESS, { message }),
  sendMessageFailure: (errorMessage: string) =>
    createAction(ActionTypes.SEND_MESSAGE_FAILURE, { errorMessage }),
  addChat: (chat: ChatType) => createAction(ActionTypes.ADD_CHAT, { chat }),
  addMessage: (message: MessageType) =>
    createAction(ActionTypes.ADD_MESSAGE, { message }),
  resetSentStatus: () => createAction(ActionTypes.RESET_SENT_STATUS),
};
