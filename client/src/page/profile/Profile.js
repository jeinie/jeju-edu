import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import ProfileDetail from "./ProfileDetail";
import { HiLocationMarker } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";

export default function Profile() {
  const [selected, setSelected] = useState("join");
  const [studyList, setStudyList] = useState([]);

  let userId = useSelector((state) => {
    return state.user.id;
  });

  const handleJoin = () => {
    setSelected("join");
    axios.get(`/api/getStudyListNotMine/${userId}`).then((res) => {
      setStudyList(res.data.studyListNotMine);
    });
  };

  const handleCreate = () => {
    setSelected("create");
    axios.get(`/api/getStudyListMine/${userId}`).then((res) => {
      setStudyList(res.data.studyListNotMine);
    });
  };

  console.log(studyList);

  const handleImage = (num) => {
    switch (Math.floor(num / 4)) {
      case 1:
        return "매칭";
      case 2:
        return "실패";
      case 3:
        return "대기";
      default:
        return "매칭";
    }
  };

  useEffect(() => {
    handleJoin();
  }, []);

  return (
    <MainContainer>
      <p className="myProfile">My page</p>
      <div className="pageBtn">
        {/* 상단의 Page 바꾸는 버튼 */}
        <div
          className={selected === "join" ? "changeStyle" : "base"}
          onClick={handleJoin}
        >
          참여
        </div>
        <div
          className={selected === "create" ? "changeStyle" : "base"}
          onClick={handleCreate}
        >
          개설
        </div>
      </div>
      {/* {studyList ? <ProfileDetail list={studyList} /> : <></>} */}
      <ListContainer>
        {studyList.map((el, idx) => {
          return (
            <ListWrapper key={idx}>
              <WrapperHeader>
                <p>{el.who_open}</p>
                <div>{handleImage(el.study_no)}</div>
              </WrapperHeader>
              <div>{el.study_title}</div>
              <div>
                <div>
                  <HiLocationMarker />
                  <p>place</p>
                  <p>{el.studyAt_location}</p>
                </div>
                <div>
                  <MdPeopleAlt />
                  <p>
                    {el.study_no}/{el.min_member_cnt}
                  </p>
                </div>
              </div>
            </ListWrapper>
          );
        })}
      </ListContainer>
    </MainContainer>
  );
}

const MainContainer = styled.section`
  margin-top: 50px;
  background-color: white;
  .pageBtn {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
  }
  .base {
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 25px;
    background-color: #f4ede7;
    color: black;
    font-weight: 600;
  }
  .changeStyle {
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 25px;

    background-color: black;
    color: white;
  }

  .myProfile {
    text-align: center;
    width: 90%;
    margin: 0 20px;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 11px;
    margin-bottom: 20px;
    /* border-bottom: 1px solid black; */
  }
`;

const ListContainer = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid red;
`;

const ListWrapper = styled.div`
  border: 1px solid purple;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  margin-bottom: 20px;
`;

const WrapperHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
