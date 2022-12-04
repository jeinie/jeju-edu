import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

import PlusBtn from "./PlusBtn";

export default function Footer({page, setPage}) {
  const {pathname} = useLocation();

  if (pathname === "/login") return;
  return (
    <FooterContainer>
      <Link to="/" className="footerLink">
        <div
          className={page !== "search" ? "iconBox viewPage" : "iconBox"}
          onClick={()=>setPage("search")}
        >
          <FiSearch />
        </div>
      </Link>
      <PlusBtn />
      <BsFillPersonFill className={page !== "profile" ? "viewPage" : ""} onClick={()=>setPage("profile")}/>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  font-size: 48px;
  color: #bababa;
  position: fixed;
  top: 90%;
  background: white;
  padding: 0 48px;
  a {
    color: black;
  }

  .footerLink {
    color: black;
  }

  .iconBox {
    flex-grow: 1;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .viewPage {
    color: #bababa;
  }
`;
