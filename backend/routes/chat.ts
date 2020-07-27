import express from "express";
import shortId from "shortid";
const router = express.Router();

interface Message {
  id: number;
  message: string;
}

interface Chat {
  id: string;
  name: string;
  messages?: Message[];
}

export const chats: Chat[] = [];
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
