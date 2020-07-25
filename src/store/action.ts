import { createAction } from "./redux";

export enum ActionTypes {
  createChat = "creatChat",
}

export const actions = {
  createChat: (chatName: string) =>
    createAction(ActionTypes.createChat, { chatName }),
};
