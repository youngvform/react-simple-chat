import express from "express";
import { addMessage, addMessages, chats } from "./chat";
const router = express.Router();

/* GET users listing. */
router.get("/:id", function (req, res, next) {
  try {
    if (!req.params.id) {
      return res.status(400).send("No Chat ID!");
    }
    const chat = chats.find((chat) => chat.id === req.params.id);
    if (!chat) {
      return res.status(404).send("No Chat!");
    }
    const messages = chat.messages ?? [];
    addMessages(req.params.id, messages);
    return res.json(messages);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { chatId, messageText } = req.body;
    if (!chatId || !messageText) {
      return res.status(400).send("Invalid Parameter!");
    }
    const chat = chats.find((chat) => chat.id === chatId);
    if (!chat) {
      return res.status(404).send("No Chat!");
    }
    const message = addMessage(chatId, messageText);
    return res.json(message);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default router;
