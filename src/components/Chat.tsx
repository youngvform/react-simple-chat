import React from "react";
import { ChatType } from "../types";
import styled from "styled-components";
import { CustomLink } from "../styles/CustomLink";

interface Props {
  chat: ChatType;
}

const Container = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
`;

const Title = styled.h2`
  cursor: pointer;
`;

function Chat({ chat }: Props) {
  return (
    <Container>
      <Title>
        <CustomLink to={chat.id}>{chat.name}</CustomLink>
      </Title>
    </Container>
  );
}

export default Chat;
