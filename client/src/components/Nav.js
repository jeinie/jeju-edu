import React, { useState, useRef } from "react";
import styled from "styled-components";

export default function Nav() {
  const [onPage, setOnPage] = useState(false);
  const codeEle = useRef();
  const singEle = useRef();
  const danceEle = useRef();

  const handlePageMenu = () => {
    setOnPage(!onPage);
    const div = document.querySelectorAll("div");
    console.log(div);
    // div.classList.toggle("clickPage");
  };

  return (
    <NavContainer>
      <div className="navBox" ref={codeEle} onClick={handlePageMenu}>
        코드
      </div>
      <div className="navBox" ref={singEle} onClick={handlePageMenu}>
        노래
      </div>
      <div className="navBox" ref={danceEle} onClick={handlePageMenu}>
        춤
      </div>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  width: 100%;
  border: 1px solid black;
  display: flex;
  color: #e47b00;
  .navBox {
    border: 1px solid black;

    text-align: center;
    flex-grow: 1;
  }

  .clickPage {
    color: black;
  }
  &.active {
    background-color: lightblue;
  }
`;
