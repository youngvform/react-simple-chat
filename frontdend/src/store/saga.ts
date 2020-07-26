import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import useSwr, { mutate } from "swr";
import { apiPostByUrl } from "../lib/api";

import { actions, ActionTypes } from "./action";
import { apiUrls } from "../lib/config";
import { AxiosResponse } from "axios";

function* createChatSaga(action: ReturnType<typeof actions.createChatRequest>) {
  try {
    const { chatName } = action.payload;
    const { data }: AxiosResponse = yield call(
      apiPostByUrl,
      apiUrls.createChat,
      {
        name: chatName,
      }
    );
    yield put(actions.createChatSuccess(data));
  } catch (e) {
    console.log(e);
  }
}
function* watchChatCreate() {
  yield takeLatest(ActionTypes.CREATE_CHAT_REQUEST, createChatSaga);
}

export default function* chatSaga() {
  yield all([fork(watchChatCreate)]);
}
