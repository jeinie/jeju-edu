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
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Main() {
  const [category, setCategory] = useState("code");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getStudyList = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/getStudyList/${category}`);
      setList(response.data.studyList);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    getStudyList(category);
  }, [category]);

  return (
    <LayoutMainPage>
      <MainContainer>
        <AddressInput update={setList} />
        <MainCategory selected={category} changeCategory={setCategory} />
        {loading ? (
          <LoadingSpinner height="50vh" />
        ) : (
          <>
            {list.map((el, idx) => {
              return (
                <Link to={`/detail/partydetail/${el.study_no}`} key={idx}>
                  <StudyCard item={el} />
                </Link>
              );
            })}
          </>
        )}
      </MainContainer>
    </LayoutMainPage>
  );
}

const MainContainer = styled.div`
  padding-top: 30px;
  margin-bottom: 80px;

  .test {
    height: 900px;
    border: 1px solid black;
  }
`;
