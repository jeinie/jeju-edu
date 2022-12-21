import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

export default function Footer() {
  const [page, setPage] = useState("search");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setPage(pathname);
  }, [pathname]);

  const goSearch = () => {
    navigate("/home");
  };

  const goJoin = () => {
    navigate("/detail/partyjoin");
  };

  const goProfile = () => {
    navigate("/profile");
  };

  return (
    <FooterContainer>
      <div onClick={goSearch}>
        <FiSearch
          className="icon"
          color={page === "/home" ? "#000000" : "#bababa"}
        />
      </div>
      <AiOutlinePlus className="plusbtn" onClick={goJoin} />
      <div onClick={goProfile}>
        <BsFillPersonFill
          className="icon"
          color={page === "/profile" ? "#000000" : "#bababa"}
        />
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 60px;
  font-size: 48px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 20;
  background: white;

  .plusbtn {
    min-width: 48px;
    height: 48px;
    border-radius: 50%;
    color: white;
    background-color: black;
  }

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      height: 48px;
    }
  }
`;
