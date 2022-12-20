import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import MainCategory from "../../components/Nav";
import Footer from "./../../components/Footer";
import AddressInput from "../../components/maps/AddressInput";
import StudyCard from "../../components/StudyCard";
import Titlebar from "../../components/Titlebar.js";
import LayoutMainPage from "../../layouts/LayoutMainPage";

export default function Main() {
  const [category, setCategory] = useState("code");
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/getStudyList/${category}`).then((res) => {
      console.log(res.data);
      setList(res.data.studyList);
    });
  }, [category]);

  return (
    <LayoutMainPage>
      <MainContainer>
        <AddressInput update={setList} />
        <MainCategory selected={category} changeCategory={setCategory} />
        {list.map((el, idx) => {
          return (
            <Link to={`/detail/partydetail/${el.study_no}`} key={idx}>
              <StudyCard item={el} />
            </Link>
          );
        })}
      </MainContainer>
    </LayoutMainPage>
  );
}

const MainContainer = styled.div`
  padding-top: 30px;
  margin-bottom: 100px;

  .test {
    height: 900px;
    border: 1px solid black;
  }
`;
