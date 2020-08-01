import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import Chat from "./Chat";
import { useChatState } from "../hooks/useChatState";
import { useDispatch } from "react-redux";
import { actions } from "../store/action";
import Layout from "./Layout";
import { baseApiUrl } from "../lib/config";

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
`;

function ChatList() {
  const { chatList, isChatCreated } = useChatState();
  const dispatch = useDispatch();
  const router = useHistory();
  const socketRef = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    dispatch(actions.getChatsRequest());
  }, [dispatch]);

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
      if (isChatCreated) {
        const chat = chatList[chatList.length - 1];
        if (chat) {
          socketRef.current.emit("newChat");
          router.push(`/chat/${chat.id}`);
          console.log("asdfasd" + { isChatCreated });
        }
      }
      socketRef.current.on("getNewChat", () => {
        dispatch(actions.getChatsRequest());
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("getNewChat");
      }
    };
  }, [dispatch, router, isChatCreated, chatList]);

  return (
    <Layout>
      <Container>
        {chatList.length > 0 &&
          chatList.map((chat) => <Chat key={chat.id} chat={chat} />)}
        {chatList.length === 0 && <p>no chatList!</p>}
      </Container>
    </Layout>
  );
}

export default ChatList;
