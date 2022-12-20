import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Titlebar from "../components/Titlebar";
import BaseLayout from "./BaseLayout";

const Content = styled.main`
  width: 100%;
  height: calc(100vh - 120px);
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 20;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const LayoutMainPage = ({ children }) => {
  return (
    <BaseLayout>
      <Titlebar />
      <Content>{children}</Content>
      <Footer />
    </BaseLayout>
  );
};

export default LayoutMainPage;
