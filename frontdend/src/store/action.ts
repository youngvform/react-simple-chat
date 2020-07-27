import { createAction } from "./redux";
import { ChatType, MessageType } from "../types";

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
};
