import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LayoutDetailPage from "../../layouts/LayoutDetailPage";
import { BsChevronLeft } from "react-icons/bs";

export default function Titlebar() {
  const navigate = useNavigate();
  return (
    <LayoutDetailPage>
      <MainStyle>
        <BsChevronLeft className="header-goback" onClick={() => navigate(-1)} />
        <h1 className="header-title">계정 관리</h1>
        <hr />
      </MainStyle>
    </LayoutDetailPage>
  );
}

const MainStyle = styled.main`
  background-color: white;
  box-sizing: border-box;

  margin: 32px 32px;
  .header-goback {
    float: left;
    color: #727272;
  }
  .header-title {
    text-align: center;
  }

  .wrapper {
    margin: 0 20px;
  }

  .createParty {
    margin-top: 20px;
  }

  .modalLayout {
    width: 100%;
    padding-bottom: 100px;
  }

  input {
    background-color: #faf6f2;
    width: 90%;
    border-radius: 16px;
    padding: 15px;
    border: none;
  }

  /* div {
    border: none;
  } */

  textarea {
    background-color: #faf6f2;
    border: none;
    padding: 15px;
  }

  .partyName {
    margin-top: 15px;
  }

  .addressChecked {
    float: right;
    border: 1px solid black;
    border-radius: 25px;
    padding: 5px;
    background-color: #faf6f2;
    transform: translate(-10%, -110%);
    cursor: pointer;
  }

  .partyDescLabel {
    margin-top: 25px;
  }

  .partyDesc {
    width: 90%;
    height: 117px;
  }

  .finish {
    width: 100%;
    height: 35px;
    border-radius: 30px;
    background-color: black;
    border: none;
    color: white;
    margin-top: 20px;
  }

  .labels {
    display: block;
    margin: 20px 0;
  }
`;
