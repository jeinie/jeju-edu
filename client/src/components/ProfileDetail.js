import React from "react";
import styled from "styled-components";
import { MdPeopleAlt } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";

export default function ProfileDetail({
  join,
  create,
  joinState,
  createState,
}) {
  // const stateArr = ["대기","매칭","마감기한 만료","","완료"]
  console.log(join);
  console.log(create);
  console.log(joinState, "joinState");
  console.log(createState, "createState");
  if (joinState === true) {
    return (
      <Wrapper>
        {join.map((el, idx) => {
          return (
            <ListContainer key={idx}>
              <div className="header">
                <div className="headerTitleState">
                  <p className="userName">{el.who_open}</p>
                  <p className="partyName">{el.study_name}</p>
                </div>
                <div>
                  <button className="matching">매칭</button>
                </div>
              </div>
              <div>
                <div className="bodyInfo">
                  <HiLocationMarker />
                  <p className="infoMiddle">place</p>
                  <p>{el.location}</p>
                </div>
                <div className="footerInfo">
                  <MdPeopleAlt />
                  <p className="footerMember">{el.members}</p>
                </div>
              </div>
            </ListContainer>
          );
        })}
      </Wrapper>
    );
  } else if (createState === true) {
    return (
      <Wrapper>
        {create.map((el, idx) => {
          return (
            <ListContainer key={idx}>
              <div className="header">
                <div>
                  <p className="userName">{el.who_open}</p>
                  <p className="partyName">{el.study_name}</p>
                </div>
                <div>
                  <button className="matching">매칭</button>
                </div>
              </div>
              <div className="body">
                <div className="bodyInfo">
                  <HiLocationMarker />
                  <p className="infoMiddle">place</p>
                  <p>{el.location}</p>
                </div>
                <div>
                  <MdPeopleAlt />
                  <p className="member">{el.members}/10</p>
                </div>
              </div>
            </ListContainer>
          );
        })}
      </Wrapper>
    );
  }
}

const Wrapper = styled.article`
  padding: 24px 12px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ListContainer = styled.section`
  padding: 0 12px 50px;
  margin: 0 20px 23px;
  width: 100%;
  height: 102px;
  background-color: #faf6f2;
  padding-top: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  .headerTitleState {
    text-align: left;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-around;
  }

  .userName {
    margin-bottom: 10px;
    font-weight: 350;
    font-size: 15px;
  }

  .partyName {
    font-weight: 700;
    font-size: 18px;
  }

  .matching {
    background-color: black;
    color: white;
    border-radius: 8px;
    width: 80px;
    height: 27px;
  }

  .member {
    margin-left: 6px;
  }

  .body {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  .bodyInfo {
    display: flex;
    margin-top: 18px;
  }

  .infoMiddle {
    margin: 0 5px;
  }

  .footerInfo {
    display: flex;
  }

  .footerMember {
    margin-left: 6px;
  }
`;
