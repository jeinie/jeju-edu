import React, { useState } from "react";
import styled from "styled-components";
import { HiLocationMarker } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";
import axios from "axios";
import BasicModal from "../../components/Modal";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function ViewDetail({ list, id }) {
  const newData = list.data.studyInfo;
  console.log(newData);

  let userId = useSelector((state) => {
    return state.user.id;
  });

  const handleModalView = () => {
    console.log(id);
    console.log(userId);
    axios.post("http://13.125.223.194:56742/api/joinStudy", {
      body: {
        study_no: id,
        id: userId,
      },
    });
  };

  if (typeof list === "undefined") {
    return;
  }
  return (
    <ViewDetailContainer>
      <div className="wrapper">
        <div className="containerHeader">
          <div className="headerLeft">
            <section className="headerLeftContent">
              <div className="headerTitle">
                <p className="userName">{newData.who_open}</p>
                <p className="studyName">{newData.study_name}</p>
              </div>
            </section>
            <section className="placeData">
              <div className="placeAddress">
                <HiLocationMarker />
                {/* 마커 아이콘 */}
                <h6 className="addressTitle">place</h6>
                <p className="address">{newData.location}</p>
              </div>
              <div className="memberContainer">
                <MdPeopleAlt />
                {/* 사람들 아이콘 */}
                <p className="partyMembers">{`${newData.members}/10`}</p>
              </div>
              <div className="calender">
                {/* 달력 아이콘 */}
                <BsCalendar2WeekFill />
                <p className="deathLine">~ {newData.close_date}</p>
              </div>
            </section>
          </div>
          <div className="headerCircle"></div>
        </div>
        <pre className="partyDesc">{newData.study_detail}</pre>
        <section className="detailCreateBtn">
          <div className="btnBox">
            {/* <button
              className="joinBtn"
              onClick={handleModalView}
            >{`J-JOIN`}</button> */}
            <BasicModal list={newData} />
          </div>
        </section>
      </div>
    </ViewDetailContainer>
  );
}

const ViewDetailContainer = styled.section`
  padding-top: 35px;

  .wrapper {
    font-size: 12px;
    margin: 0 20px;
    padding: 0 0 27px 17px;
    /* box-shadow: 1px 1px 3px 1px #dadce0; */
  }
  .containerHeader {
    display: flex;
    margin-top: 16px;
    align-items: top;
    padding-top: 16px;
    justify-content: space-between;
  }
  .headerLeftContent {
    display: flex;
    margin-bottom: 10px;
  }
  .headerLeft {
    display: flex;
    width: 60%;
    flex-direction: column;
  }
  .calender {
    font-size: 10px;
  }
  .deathLine {
    margin-left: 16px;
  }
  .headerProfile {
    text-align: left;
    margin-right: 6px;
    font-size: 24px;
    width: 24px;
    height: 24px;
    background-color: #d9d9d9;
    border-radius: 50%;
  }
  .headerTitle {
    padding-left: 6px;
    width: 24px;
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  .userName {
    font-size: 15px;
    font-weight: 350;
  }

  .studyName {
    width: 100%;
    font-size: 18px;
    font-weight: 700;
  }
  .headerCircle {
    text-align: right;
    width: 78px;
    height: 78px;
    background-color: #d9d9d9;
    border-radius: 50%;

    position: relative;
    top: -20px;
    left: 0;
  }

  .placeData {
    padding-left: 6px;
    display: flex;
    flex-direction: column;
  }

  .placeAddress {
    display: flex;
    align-items: center;
  }

  .addressTitle {
    margin: 0 6px 0 18px;
  }

  .memberContainer {
    display: flex;
  }

  .partyMembers {
    margin-left: 18px;
  }

  .partyDesc {
    width: 208px;
    height: 60px;
  }

  .detailCreateBtn {
    display: flex;
    justify-content: center;
    margin-top: 27px;
  }

  .btnBox {
    text-align: center;
    display: flex;
    flex-direction: row;
  }
  .joinBtn {
    width: 219px;
    height: 28px;
    color: white;
    margin-left: 9px;
    background-color: black;
    border: none;
    border-radius: 25px;
  }
`;
