import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { actions } from "../store/action";
import { useDispatch } from "react-redux";
import { useChatState } from "../hooks/useChatState";
import ErrorMessage from "../styles/ErrorMessage";
import Header from "./Header";
import MessageList from "./MessageList";
import io from "socket.io-client";
import { baseApiUrl } from "../lib/config";
import { MessageType } from "../types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Contents = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
`;

const SendLayer = styled.form`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2rem;
  background-color: white;
`;

const Input = styled.input`
  height: 2rem;
  padding: 0.25rem;
  font-size: 1.5rem;
  border: none;
  border-top: 5px solid gold;
  width: 100%;
  flex: 1;
`;

const SendButton = styled.button`
  background: none;
  width: 15%;
  border: none;
  border-top: 5px solid gold;
  border-left: 5px solid gold;
  font-size: 1.5rem;
  cursor: pointer;
`;

function Room() {
  const [text, setText] = useState("");
  const { messages, messagingError, isMessageSent } = useChatState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const messageRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    dispatch(actions.getMessagesRequest(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  useEffect(() => {
    socketRef.current = io.connect(baseApiUrl);
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && isMessageSent) {
        socketRef.current.emit("newMessage", {
          message: { ...lastMessage, isMine: false },
        });
      }

      socketRef.current.on(
        "getNewMessage",
        ({ message }: { message: MessageType }) => {
          if (!isMessageSent) {
            const targetMessage = messages.find((m) => m.id === message.id);
            if (!targetMessage) {
              dispatch(actions.addMessage(message));
            }
          } else {
            dispatch(actions.resetSentStatus());
          }
        }
      );
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("getNewMessage");
      }
    };
  }, [dispatch, messages, isMessageSent]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (text.trim()) {
        // send
        dispatch(actions.sendMessageRequest({ chatId: id, messageText: text }));
        setText("");
      }
    },
    [id, text, dispatch]
  );

  return (
    <Container ref={messageRef}>
      <Header />
      <Contents>
        {messagingError && <ErrorMessage>{messagingError}</ErrorMessage>}
        <MessageList messageList={messages} />
      </Contents>
      <SendLayer onSubmit={onSubmit}>
        <Input onChange={onChange} value={text} />
        <SendButton type="submit">Send!</SendButton>
      </SendLayer>
    </Container>
  );
}

export default Room;
