import React from "react";
import styled from "styled-components";
import Message from "./Message";
import { MessageType } from "../types";

interface Props {
  messageList: MessageType[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  & > .mine {
    justify-content: flex-end;
  }
  &:last-child {
    margin-bottom: 50px;
  }
`;

function MessageList({ messageList }: Props) {
  return (
    <Container>
      {messageList.map((message) => (
        <Message key={message.id} messageData={message} />
      ))}
    </Container>
  );
}

export default MessageList;
