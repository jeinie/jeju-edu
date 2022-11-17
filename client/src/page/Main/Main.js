import React from "react";
import styled from "styled-components";

import Footer from "../../components/Footer.js";
import Input from "../../components/Input.js";
import PlusBtn from "../../components/PlusBtn.js";
import StudyCard from "../../components/StudyCard.js";

function test() {
  let array = [];
  for (let i=0;i<3; i++) {
    array.push(<StudyCard/>);
  }
  return array;
}

export default function Main() {
  return (
    <MainContainer>
      <Input />
      <>
      {test()}
      </>
      <PlusBtn />
      <Footer />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  padding-top: 56px;
`;
