import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import ProfileDetail from "../../components/ProfileDetail";
import serverIP from "../../config/config";
export default function Profile() {
  const [join, setJoin] = useState(true); //참여버튼 상태
  const [create, setCreate] = useState(false); //개설버튼 상태
  const [joinList, setJoinList] = useState(null);
  const [createList, setCreateList] = useState(null);
  // let user = useSelector((state) => {
  //   return state;
  // });
  // console.log(user)

  let userId = useSelector((state) => {
    return state.user.id;
  });

  useEffect(() => {
    axios
      .get(`http://${serverIP.serverIP}/api/getStudyListNotMine/${userId}`)
      .then((data) => {
        setJoinList(data);
        return null;
      })
      .then(() => {
        return axios.get(
          `http://${serverIP.serverIP}/api/getStudyListMine/${userId}`
        );
      })
      .then((data) => {
        setCreateList(data);
      });
  }, [userId]);

  const handleJoin = () => {
    setJoin(true);
    setCreate(false);
  };

  const handleCreate = () => {
    setJoin(false);
    setCreate(true);
  };
  if (joinList | (createList === null)) {
    return null;
  }
  console.log(createList);

  return (
    <MainContainer>
      <p className="myProfile">My page</p>
      <div className="pageBtn">
        {/* 상단의 Page 바꾸는 버튼 */}
        <div className={join ? "changeStyle" : "base"} onClick={handleJoin}>
          참여
        </div>
        <div className={create ? "changeStyle" : "base"} onClick={handleCreate}>
          개설
        </div>
      </div>
      <ProfileDetail
        join={joinList.data}
        create={createList.data}
        joinState={join}
        createState={create}
      />
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
