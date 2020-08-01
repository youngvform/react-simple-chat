import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import {apiGetByUrl, apiPostByUrl} from "../lib/api";

import {actions, ActionTypes} from "./action";
import {apiUrls} from "../lib/config";
import {AxiosResponse} from "axios";

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
    yield put(actions.createChatFailure(e.response.data));
  }
}
function* watchChatCreate() {
  yield takeLatest(ActionTypes.CREATE_CHAT_REQUEST, createChatSaga);
}

function* getChatsSaga() {
  try {
    const { data }: AxiosResponse = yield call(apiGetByUrl, apiUrls.getChats);
    yield put(actions.getChatsSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(actions.getChatsFailure(e.response.data));
  }
}

function* watchGetChats() {
  yield takeLatest(ActionTypes.GET_CHATS_REQUEST, getChatsSaga);
}

function* getMessagesSaga(
  action: ReturnType<typeof actions.getMessagesRequest>
) {
  try {
    const { chatId } = action.payload;
    const { data }: AxiosResponse = yield call(
      apiGetByUrl,
      apiUrls.getMessages(chatId)
    );
    yield put(actions.getMessagesSuccess(data));
  } catch (e) {
    console.dir(e);
    console.error(e);
    yield put(actions.getMessagesFailure(e.response.data));
  }
}

function* watchGetMessages() {
  yield takeLatest(ActionTypes.GET_MESSAGES_REQUEST, getMessagesSaga);
}

function* sendMessageSaga(
  action: ReturnType<typeof actions.sendMessageRequest>
) {
  try {
    const { params } = action.payload;
    const { data }: AxiosResponse = yield call(
      apiPostByUrl,
      apiUrls.sendMessage,
      { ...params }
    );
    yield put(actions.sendMessageSuccess(data));
  } catch (e) {
    yield put(actions.sendMessageFailure(e.response.data));
  }
}

function* watchSendMessage() {
  yield takeLatest(ActionTypes.SEND_MESSAGE_REQUEST, sendMessageSaga);
}
export default function* chatSaga() {
  yield all([
    fork(watchChatCreate),
    fork(watchGetChats),
    fork(watchGetMessages),
    fork(watchSendMessage),
  ]);
}
