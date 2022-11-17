import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Profile() {
  const [join, setJoin] = useState(true); //참여버튼 상태
  const [create, setCreate] = useState(false); //개설버튼 상태
  const [joinList, setJoinList] = useState(null);
  const [createList, setCreateList] = useState(null);
  // let user = useSelector(state=>{return state})
  // console.log(user)

  let userId = useSelector((state) => {
    return state.user.id;
  });
  console.log(userId);

  useEffect(() => {
    axios
      .get(`http://13.125.223.194:56742/api/getStudyListNotMine/${userId}`)
      .then((data) => setJoinList(data.data));
    // join 버튼 list

    axios
      .get(`http://13.125.223.194:56742/api/getStudyListMine/${userId}`)
      .then((data) => setCreateList(data.data));
    // create 버튼 list
  }, []);
  console.log(createList);
  console.log(joinList);

  const handleJoin = () => {
    setJoin(true);
    setCreate(false);
  };

  const handleCreate = () => {
    setJoin(false);
    setCreate(true);
  };

  const ListContent = () => {
    return (
      <ListContainer>
        <div className="header">
          <div>
            <p>userName</p>
            <p>studyTitle</p>
          </div>
          <div>
            <button>매칭</button>
          </div>
        </div>
      </ListContainer>
    );
  };
  return (
    <MainContainer>
      <div className="pageBtn">
        {/* 상단의 Page 바꾸는 버튼 */}
        <div className={join ? "changeStyle" : "base"} onClick={handleJoin}>
          참여
        </div>
        <div className={create ? "changeStyle" : "base"} onClick={handleCreate}>
          개설
        </div>
      </div>

      {/* list 뿌려주는 container */}
      <div>
        {join
          ? joinList.map((el, idx) => {
              return <ListContent key={idx} items={el} />;
            })
          : createList.map((el, idx) => {
              return <ListContent key={idx} items={el} />;
            })}
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.section`
  margin-top: 100px;
  .pageBtn {
    display: flex;
    justify-content: space-around;
  }
  .base {
    width: 134px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 25px;
    background-color: #faf6f2;
    color: black;
  }
  .changeStyle {
    width: 134px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 25px;

    background-color: black;
    color: white;
  }
`;

const ListContainer = styled.section`
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .header {
    display: flex;
  }
`;
