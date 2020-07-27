import express from "express";
import { chats } from "./chat";
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
    const messages = chat.messages ? chat.messages : [];
    return res.json(messages);
  } catch (e) {}
});

export default router;
