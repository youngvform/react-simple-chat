import express from "express";
import shortId from "shortid";
import format from "date-fns/format";
const router = express.Router();

interface Message {
  id: number;
  message: string;
  sendDate: string;
}

interface Chat {
  id: string;
  name: string;
  messages?: Message[];
}

export let chats: Chat[] = [];
export function addMessage(chatId: string, messageText: string) {
  const chat = chats.find((chat) => chat.id === chatId);
  if (chat?.messages) {
    const lastId = (chat.messages[chat.messages.length - 1]?.id ?? 0) + 1;
    const message = {
      id: lastId,
      message: messageText,
      sendDate: format(new Date(), "MM/dd/h:m a"),
    };
    chat.messages.push(message);
    addMessages(chatId, chat.messages);
    return message;
  }
}
export function addMessages(chatId: string, messages: Message[]) {
  chats = chats.map((chat) =>
    chat.id === chatId ? { ...chat, messages } : chat
  );
}
/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    return res.json(chats);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/create", function (req, res, next) {
  try {
    const chatId = shortId.generate();
    const chat = { id: chatId, name: req.body.name };
    chats.push(chat);
    return res.json(chat);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default router;
