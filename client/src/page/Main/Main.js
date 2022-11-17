import React, { useState } from "react";
import styled from "styled-components";

import Input from "../../components/Input";
import PlusBtn from "../../components/PlusBtn";
import StudyCard from "../../components/StudyCard";
import MainCategory from "./MainCategory";
import ViewDetail from "./ViewDetail";
import Footer from "./../../components/Footer";

export default function Main({ list }) {
  const [onDetail, setOnDetail] = useState(false);

  const handleViewDetail = (index, id) => {
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
      {list.map((el, idx) => {
        return <StudyCard item={el} key={idx} onClick={handleViewDetail} />;
      })}
      <ViewDetail list={list} />
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
