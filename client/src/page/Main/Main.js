import React from "react";
import styled from "styled-components";

import Footer from "../../components/Footer";
import Input from "../../components/Input";
import PlusBtn from "../../components/PlusBtn";
import Nav from "./../../components/Nav";

export default function Main() {
  return (
    <MainContainer>
      <Input />
      <Nav />
      <PlusBtn />
      {/* <div className="test"></div> */}
      <Footer />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  padding-top: 56px;

  .test {
    height: 900px;
    border: 1px solid black;
  }
`;
