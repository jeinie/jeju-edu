import React, { useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import MainCategory from "../../components/Nav";
import Footer from "./../../components/Footer";
import AddressInput from "../../components/maps/AddressInput";
import StudyCard from "../../components/StudyCard";
import Lending from "../Lending";

export default function Main() {
  const [category, setCategory] = useState("code");
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/getStudyList/${category}`)
      .then((res) => {
        console.log(res.data);
        setList(res.data.studyList);
      })
      .catch(function (error) {
        navigate("/login");
      });
  }, [category, navigate]);

  return (
    <MainContainer>
      <AddressInput update={setList} />
      <MainCategory selected={category} changeCategory={setCategory} />
      {list.map((el, idx) => {
        return (
          // <Suspense fallback={<Lending />}>
          <Link to={`/partydetail/${el.study_no}`} key={idx}>
            <StudyCard item={el} />
          </Link>
          // {/* </Suspense> */}
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
