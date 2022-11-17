import React, { useState } from "react";
import styled from "styled-components";

import Footer from "../../components/Footer";
import Input from "../../components/Input";
import PlusBtn from "../../components/PlusBtn";
import StudyCard from "../../components/StudyCard";
import MainCategory from "./MainCategory";
import ViewDetail from "./ViewDetail";

function test() {
  const array = [];
  for (let i = 0; i < 3; i++) {
    array.push(<StudyCard key={i} />);
  }
  return array;
}

export default function Main() {
  const [onDetail, setOnDetail] = useState(false);

  const handleviewDetail = (index, id) => {
    if (index === id) {
      setOnDetail(true);
      return <ViewDetail />;
    }
  };
  return (
    <MainContainer>
      <Input />
      <MainCategory />
      <PlusBtn />
      <ViewDetail />
      {/* {<>{test()}</>} */}
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
