import React from "react";
import styled from "styled-components";

import Input from "../../components/Input";
import PlusBtn from "../../components/PlusBtn";
import StudyCard from "../../components/StudyCard";

function test() {
  const array = []
  for (let i=0; i<3; i++) {
    array.push(<StudyCard key={i}/>);
  }
  return array;
}

export default function Main() {
  return (
    <MainContainer>
      <Input />
      <PlusBtn />
      {
        <>{test()}</>
      }
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
