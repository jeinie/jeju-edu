import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

export default function Footer() {
  const [page, setPage] = useState("search");
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const goSearch = () => {
    setPage("search");
    navigate("/");
  }

  const goJoin = () => {
    navigate("/partyjoin");
  }

  const goProfile = () => {
    setPage("profile");
    navigate("/profile");
  }

  if (pathname === "/login" || pathname === "/join") return;
  return (
    <FooterContainer>
        <FiSearch onClick={goSearch} color={page === 'search' ? '#000000' : '#bababa'}/>
        <AiOutlinePlus className="plusbtn" onClick={goJoin}/>
        <BsFillPersonFill onClick={goProfile} color={page === 'profile' ? '#000000' : '#bababa'}/>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 49px;
  font-size: 48px;
  position: fixed;
  bottom: 0;
  background: white;

  .plusbtn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: white;
    background-color: black;
  }
`;