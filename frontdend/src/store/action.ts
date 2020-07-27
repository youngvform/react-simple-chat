import { createAction } from "./redux";
import { ChatType } from "../types";

export enum ActionTypes {
  CREATE_CHAT_REQUEST = "chat/CREATE_CHAT_REQUEST",
  CREATE_CHAT_SUCCESS = "chat/CREATE_CHAT_SUCCESS",
  CREATE_CHAT_FAILURE = "chat/CREATE_CHAT_FAILURE",
}

export const actions = {
  createChatRequest: (chatName: string) =>
    createAction(ActionTypes.CREATE_CHAT_REQUEST, { chatName }),
  createChatSuccess: (data: ChatType) =>
    createAction(ActionTypes.CREATE_CHAT_SUCCESS, { data }),
  createChatFailure: (errorMessage: string) =>
    createAction(ActionTypes.CREATE_CHAT_FAILURE, { errorMessage }),
};
