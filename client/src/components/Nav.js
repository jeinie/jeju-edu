import React, { useState, useRef } from "react";
import styled from "styled-components";
import ViewDetail from "../page/Main/ViewDetail";

export default function MainCategory({updateCategory}) {
  const [onCode, setOnCode] = useState(true);
  const [onSing, setOnSing] = useState(false);
  const [onDance, setOnDance] = useState(false);
  // const [APIdata, setAPIData] = useState(null);
  const codeEle = useRef();
  const singEle = useRef();
  const danceEle = useRef();

  const handlePageMenu = (e) => {
    if (e.target.textContent === "코드") {
      console.log("코드");
      // axios.get("").then((data) => setAPIData(data));
      setOnCode(true);
      setOnSing(false);
      setOnDance(false);
      updateCategory(0);
    } else if (e.target.textContent === "노래") {
      console.log("노래");
      // axios.get("").then((data) => setAPIData(data));
      setOnCode(false);
      setOnSing(true);
      setOnDance(false);
      updateCategory(1);
    } else if (e.target.textContent === "춤") {
      console.log("춤");
      // axios.get("").then((data) => setAPIData(data));
      setOnCode(false);
      setOnSing(false);
      setOnDance(true);
      updateCategory(2);
    }
  };

  return (
    <NavContainer style={{marginLeft: '25px', marginRight: '25px'}}>
      <div
        className={onCode ? "navBox addColor" : "navBox"}
        ref={codeEle}
        onClick={handlePageMenu}
      >
        코드
      </div>
      <div
        className={onSing ? "navBox addColor" : "navBox"}
        ref={singEle}
        onClick={handlePageMenu}
      >
        노래
      </div>
      <div
        className={onDance ? "navBox addColor" : "navBox"}
        ref={danceEle}
        onClick={handlePageMenu}
      >
        춤
      </div>
      <PartyList>{/* <ViewDetail /> */}</PartyList>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  height: 31px;
  margin-top: 48px;

  /* border: 1px solid black; */
  display: flex;
  color: #faf6f2;
  .navBox {
    margin: 0 2px;
    color: #000000;
    background-color: #faf6f2;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    text-align: center;
    flex-grow: 1;
  }

  .addColor {
    color: white;
    background-color: black;
  }
`;

const PartyList = styled.section``;
