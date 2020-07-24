import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Contents = styled.main`
  flex: 1;
`;

function Layout({ children }: Props) {
  return (
    <Container>
      <Header />
      <Contents>{children}</Contents>
      <Footer />
    </Container>
  );
}

export default Layout;
