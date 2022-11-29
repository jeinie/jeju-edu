import React, {useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import StudyCard from "../../components/StudyCard";
import MainCategory from "../../components/Nav";
import Footer from "./../../components/Footer";
import AddressInput from "../../components/maps/AddressInput";
import MainHeader from "../../components/MainHeader";

const categoryList = ["code", "sing", "design"];

export default function Main() {

  const [list, setList] = useState([]);

  return (
    <MainContainer>
      <MainHeader/>
      <AddressInput update={setList}/>
      <MainCategory/>
      {list.map((el, idx) => {
        return (
          <Link to={`/partydetail/${el.study_no}`} key={idx}>
            <StudyCard index={idx} item={el} />
          </Link>
        );
      })}
      <Footer />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  margin-bottom: 100px;

  .test {
    height: 900px;
    border: 1px solid black;
  }
`;
