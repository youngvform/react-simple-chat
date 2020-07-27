export const baseApiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000"
    : "http://localhost:4000";

const chatApi = baseApiUrl + "/chat";

export const apiUrls = {
  createChat: `${chatApi}/create`,
  getChats: `${chatApi}/`,
  getMessages: (chatId: string) => `/message/${chatId}`,
};
