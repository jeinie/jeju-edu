import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

import StudyCard from "../../components/StudyCard";
import MainCategory from "../../components/Nav";
import Footer from "./../../components/Footer";
import AddressInput from "../../components/maps/AddressInput";
import MainHeader from "../../components/MainHeader";

export default function Main() {

  const [category, setCategory] = useState("code");
  const [list, setList] = useState([]);

  useEffect(() => {
     axios.get(`/api/getStudyList/${category}`).then((data) => {
        setList(data.data);
     });
  }, [category]);

  return (
    <MainContainer>
      <MainHeader/>
      <AddressInput update={setList}/>
      <MainCategory selected={category} changeCategory={setCategory}/>
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
