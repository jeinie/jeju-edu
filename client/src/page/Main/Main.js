import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import PlusBtn from "../../components/PlusBtn";
import StudyCard from "../../components/StudyCard";
import MainCategory from "./MainCategory";
import ViewDetail from "./ViewDetail";
import Footer from "./../../components/Footer";

export default function Main({ list }) {
  const [onDetail, setOnDetail] = useState(false);

  const handleViewDetail = (e) => {
    console.log(e.target.textContent);
  };

  return (
    <MainContainer>
      <Input />
      <MainCategory />
      {list.map((el, idx) => {
        return (
          <Link to={`/PartyDetail/:${el.study_no}`}>
            <StudyCard
              index={idx}
              item={el}
              key={idx}
              handleViewDetail={handleViewDetail}
            />
          </Link>
        );
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
