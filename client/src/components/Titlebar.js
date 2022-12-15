import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components"; // 1.컴포넌트 추가
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

// 2.이미지 불러옴
import fir from "../img/fir.png";

// 3.타이틀바 : 로고(img), 메뉴(StyledBurger)
export default function Titlebar() {
  const [open, setOpen] = useState(false);
  return (
    <TitlebarContainer>
      <img src={fir} alt='logo' width='67px' height='21px' />
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <Menu open={open} setOpen={setOpen} />
    </TitlebarContainer>
  );
}

// 3-1.타이틀바 전체 스타일 정의
const TitlebarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: #ffffff;
  z-index: 100;
  border-bottom: 1px solid #dddddd;

  width: 100%;
  height: 60px;
  font-size: 48px;
  left: 0;
  bottom: 0;
  background: white;
  box-sizing: border-box;
  width: 100%;
  padding: 0px 20px;

  .plusbtn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: white;
    background-color: black;
  }
`;

//3-2.메뉴 버튼 스타일 정의 (메뉴버튼-닫기버튼 바뀌는거)
const StyledBurger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;

  &:focus {
    outline: none;
  }

  div {
    width: 1.5rem;
    height: 0.15rem;
    background: ${({ open }) => (open ? "#333333" : "#333333")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 23px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(-20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
  }
`;


//4.슬라이딩 박스 : 로고, 유저이름, 열매현황, 액션버튼, 유틸메뉴, 저작권표기
const Menu = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const goJoin = () => {
    navigate("/partyjoin");
  };
  const goJejuFruits = () => {
    navigate("#");
  };
  const handleBackSpace = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (open) {
      document.body.classList.add("scroll_lock");
      return () => {
        document.body.classList.remove("scroll_lock");
      };
    }
  }, [open]);
  return (
    <>
      {open && <Dimmed onClick={handleBackSpace} />}
      <StyledMenu open={open}>
        <MenuHead>
          <LogoImg src={fir} alt='logo' />
        </MenuHead>
        <MenuContents>
          <div className='greeting'>
            <div className='greeting-title'>반갑습니다!</div>
            <div className='greeting-name'>
              <p className='userName'>
                {/* 데이터 가져와야함 */}
                <span className='biColor'>외계공룡</span>님
              </p>
            </div>
          </div>

          <div className='fruit-dashboard'>
            <div className='fruit-normal'>
              <p>수확 열매</p>
              <p>
                {/* 데이터 가져와야함 */}
                <b>20</b>개 
              </p>
            </div>
            <div className='fruit-sick'>
              <p>아픈 열매</p>
              <p>
                {/* 데이터 가져와야함 */}
                <b>20</b>개
              </p>
            </div>
          </div>

          <GoOpenStudyBtn onClick={goJoin}>스터디 만들기</GoOpenStudyBtn>

          <GoJejuFruitsBtn onClick={goJejuFruits}>제주 열매 현황</GoJejuFruitsBtn>

          <LinkItemGroup>
            <LinkItem onClick={() => navigate("#")}>이용약관</LinkItem>
            {/* 페이지 연결해야함 */}
            <LinkItem onClick={() => navigate("#")}>비밀번호 변경</LinkItem>
            {/* 로그아웃 기능 넣어야함 */}
            <LinkItem onClick={() => navigate("#")}>로그아웃</LinkItem>
          </LinkItemGroup>

          <Copyright>Copyright © 2022 abang All Rights Reserved.</Copyright>
        </MenuContents>
      </StyledMenu>
    </>
  );
};


//4-1. 백그라운드 딤드 애니메이션 정의
const handleFade = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 100;
    }
`;

//4-2. 딤드 스타일 정의
const Dimmed = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);

  transform: all;
  animation: ${handleFade} 0.2s linear alternate;
`;

//4-3. 슬라이딩 박스 스타일 정의
const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  background: #faf6f2;
  transform: ${({ open }) => (open ? "translateX(0px)" : "translateX(105%)")};
  width: calc(80%);
  height: 100vh;
  text-align: left;
  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  filter: drop-shadow(-5px 0px 2px rgba(0, 0, 0, 0.3));

  .greeting {
    padding: 40px 24px 30px;
  }
  
  .greeting-title {
    font-size: 20px;
    font-weight: 400;
    padding-bottom: 10px;
  }

  .greeting-name {
    font-size: 24px;
    font-weight: 600;
  }

  .biColor {
    color: #e47b00;
  }

  .fruit-dashboard {
    background: #ffffff;
    padding: 0 24px;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
  }

  .fruit-normal {
    font-size: 16px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #dddddd;
  }

  .fruit-sick {
    font-size: 16px;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
`;

//4-4. 로고 이미지 스타일 정의
const LogoImg = styled.img`
  width: 67px;
  display: inline-block;
  padding: 20px;
`;

//4-5-1. 스터디 만들기 버튼 스타일 정의
const GoOpenStudyBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  border-radius: 30px;
  background-color: #e47b00;
  color: white;
  border: none;
  margin: 20px 24px 10px;
  font-size: 15px;
`;

//4-5-2. 제주 열매 현황 버튼 스타일 정의
const GoJejuFruitsBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  border-radius: 30px;
  background-color: #ffffff;
  color: black;
  border: 1px solid #666666;
  margin: 0 24px;
  font-size: 15px;
`;

//4-6-1. 유틸메뉴 그룹 스타일정의
const LinkItemGroup = styled.div`
  margin-top: 50px;
`;


//4-6-2. 유틸메뉴 3개 스타일 정의
const LinkItem = styled.div`
  border-bottom: 1px solid #dddddd;
  text-align: right;
  margin: 5px 24px;
  padding: 10px 0px;
  color: #666666;
  font-size: 14px;
`;

//4-7. 슬라이딩 박스 영역 스크롤 정의
const MenuContents = styled.div`
  overflow: scroll;
`;

//4-8. 저작권 영역 스타일 정의
const Copyright = styled.div`
  font-size: 10px;
  color: #999999;
  margin: 40px 0;
  text-align: center;
`;

//4-9. 슬라이딩 박스 해드영역 스타일 정의
const MenuHead = styled.div`
  border-bottom: 1px solid #dddddd;
  height: 60px;
`;