import React, { useEffect } from "react";
import styled from "styled-components";
import Chat from "./Chat";
import { useChatState } from "../hooks/useChatState";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { actions } from "../store/action";

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
  const { chatList } = useChatState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getChatsRequest());
  }, []);
  return (
    <Container>
      {chatList.length > 0 &&
        chatList.map((chat) => <Chat key={chat.id} chat={chat} />)}
      {chatList.length === 0 && <p>no chatList!</p>}
    </Container>
  );
}

export default ChatList;
