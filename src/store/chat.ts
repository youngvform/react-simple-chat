import shortId from "shortid";
import { actions, ActionTypes } from "./action";
import { createReducer } from "./redux";
import { ChatType } from "../types";

export interface ChatState {
  chatList: ChatType[];
}

const INITIAL_STATE: ChatState = {
  chatList: [],
};

type Action = ReturnType<typeof actions[keyof typeof actions]>;

export default createReducer<ChatState, ActionTypes, Action>(INITIAL_STATE, {
  [ActionTypes.createChat]: (state, action) => {
    const { chatName } = action.payload;
    const id = shortId.generate();
    state.chatList.push({ id, name: chatName });
  },
});
