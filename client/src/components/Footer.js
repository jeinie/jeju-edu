import React, { useState } from "react";
import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

export default function Footer() {
  const [onPage, setOnPage] = useState(true);

  const handleColor = () => {
    setOnPage(!onPage);
    return;
  };
  return (
    <FooterContainer>
      <div
        className={onPage ? "iconBox viewPage" : "iconBox"}
        onClick={handleColor}
      >
        <FiSearch />
      </div>
      <div
        className={onPage ? "iconBox" : "iconBox viewPage"}
        onClick={handleColor}
      >
        <BsFillPersonFill />
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  font-size: 48px;
  color: #cbcbcb;
  position: fixed;
  top: 90%;

  .iconBox {
    flex-grow: 1;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .viewPage {
    color: #e47b00;
  }
`;
