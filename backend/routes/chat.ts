import express from "express";
import shortId from "shortid";
const router = express.Router();

interface Chat {
  id: string;
  name: string;
}
const chats: Chat[] = [];
/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("chatttt");
  console.log(res.writeHead);
  res.json(chats);
});

router.post("/create", function (req, res, next) {
  try {
    console.log("create");
    console.log(req.body.name);
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
