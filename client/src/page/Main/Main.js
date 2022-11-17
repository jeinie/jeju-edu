import React from "react";
import styled from "styled-components";

import Footer from "../../components/Footer";
import Input from "../../components/Input";
import PlusBtn from "../../components/PlusBtn";

export default function Main() {
  return (
    <MainContainer>
      <Input />
      <PlusBtn />
      <Footer />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  padding-top: 56px;
`;
