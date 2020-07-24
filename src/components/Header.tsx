import React from "react";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  background: yellow;
  padding: 0 1rem;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  flex: 1;
  cursor: pointer;
`;

const Button = styled.button`
  font-size: 1rem;
  cursor: pointer;
  height: 1.5rem;
  background: none;
  border: none;
`;

function Header() {
  return (
    <Container>
      <Title>React Chat</Title>
      <Button>Create</Button>
    </Container>
  );
}

export default Header;
