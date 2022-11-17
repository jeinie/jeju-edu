import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Profile() {
  const [join, setJoin] = useState(true); //참여버튼 상태
  const [create, setCreate] = useState(false); //개설버튼 상태
  const [joinList, setJoinList] = useState(null);
  const [createList, setCreateList] = useState(null);

  useEffect(() => {
    // axios
    // .get()
    // .then((data) => setJoinList(data))
    // // join 버튼 list
    // .then(() => {
    axios
      .get("http://13.125.223.194:56742/api/getStudyListNotMine/:id")
      // })
      .then((data) => setCreateList(data.data));
    // create 버튼 list
  }, []);
  console.log(createList);

  const handleJoin = () => {
    setJoin(true);
    setCreate(false);
    console.log("join");
  };

  const handleCreate = () => {
    setJoin(false);
    setCreate(true);
    console.log("create");
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
        {join ? (
          <div>join</div>
        ) : (
          createList.map((el, idx) => {
            return <ListContent />;
          })
        )}
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.section`
  padding-top: 50px;
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
  justify-content: ;
  .header {
    display: flex;
  }
`;
