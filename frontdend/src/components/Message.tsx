import React from "react";
import styled from "styled-components";
import {MessageType} from "../types";

interface Props {
  messageData: MessageType;
}

const Container = styled.div`
  display: flex;
  align-items: baseline;
`;

const Balloon = styled.div<{ isMine?: boolean }>`
  font-size: 1.5rem;
  border-radius: 15%;
  color: white;
  background: ${(props) => (props.isMine ? "purple" : "#0041ff8c")};
  padding: 10px;
  margin: 10px;
`;

const Date = styled.div`
  font-size: 0.8rem;
`;

function Message({ messageData }: Props) {
  const { message, sendDate, isMine } = messageData;
  return (
    <Container className={`${isMine ? "mine" : ""}`}>
      {isMine ? (
        <>
          <Date>{sendDate}</Date>
          <Balloon isMine={isMine}>{message}</Balloon>
        </>
      ) : (
        <>
          <Balloon isMine={isMine}>{message}</Balloon>
          <Date>{sendDate}</Date>
        </>
      )}
    </Container>
  );
}

export default Message;
