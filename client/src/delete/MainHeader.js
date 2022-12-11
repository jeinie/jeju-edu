import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import HeaderImg from "../img/pro.png";

export default function MainHeader() {
  const userId = useSelector((state) => {
    return state.user.id;
  });

  // 로그인 성공시, 사용자가 갖고있는 열매 갯수를 보여준다.
  return (
    <MainHeaderContainer>
      {/* <img className="headerImg" src={HeaderImg} alt="상단 더미 이미지" /> */}
    </MainHeaderContainer>
  );
}

const MainHeaderContainer = styled.section`
  /* border: 1px solid #e37b01; */
  margin-bottom: 20px;
  border-radius: 25px;
  /* margin: 20px 21px; */
  height: 38px;
  /* .headerImg {
    width: 100%;
    top: -1px;
  } */
`;
