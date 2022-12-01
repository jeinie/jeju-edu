import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import ProfileDetail from "./ProfileDetail";

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
    })
  }

  const handleCreate = () => {
    setSelected("create");
    axios.get(`/api/getStudyListMine/${userId}`).then((res) => {
      setStudyList(res.data.studyListNotMine);
    })
  }

  useEffect(()=>{
    handleJoin();
  }, [])

  return (
    <MainContainer>
      <p className="myProfile">My page</p>
      <div className="pageBtn">
        {/* 상단의 Page 바꾸는 버튼 */}
        <div className={selected === "join" ? "changeStyle" : "base"} onClick={handleJoin}>참여</div>
        <div className={selected === "create" ? "changeStyle" : "base"} onClick={handleCreate}>개설</div>
      </div>
      {studyList ? <ProfileDetail list={studyList}/> : <></> }
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

// const ListContainer = styled.section`
//   text-align: center;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   .header {
//     display: flex;
//   }
// `;
