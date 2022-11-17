import React from "react";
import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

export default function Footer() {
  const handleColor = () => {
    return;
  };
  return (
    <FooterContainer>
      <div className="iconBox">
        <FiSearch />
      </div>
      <div className="iconBox">
        <BsFillPersonFill />
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 48px;
  font-size: 48px;
  color: #cbcbcb;
  .iconBox {
    flex-grow: 1;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
