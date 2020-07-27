import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  display: flex;
  background: yellow;
  padding: 0 1rem;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem;
`;

function Footer() {
  return <Container>Footer</Container>;
}

export default Footer;
