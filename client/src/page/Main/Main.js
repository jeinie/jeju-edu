import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import StudyCard from "../../components/StudyCard";
import MainCategory from "../../components/Nav";
import Footer from "./../../components/Footer";
<<<<<<< HEAD
import Address from "../../components/Address";
=======
import AddressInput from "../../components/AddressInput";
>>>>>>> 258eefac452c2accebb50ddba6c8ee3ac1bfc54e

export default function Main({ list }) {
  return (
    <MainContainer>
      <AddressInput/>
      <MainCategory />
      {list.map((el, idx) => {
        return (
          <Link to={`/PartyDetail/${el.study_no}`} key={idx}>
            <StudyCard index={idx} item={el} />
          </Link>
        );
      })}
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
