import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";

import { HiLocationMarker } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";
import { BsCalendar2WeekFill } from "react-icons/bs";

import tree_2_1x from "../../img/tree_2_1x.png";
import tree_3_1x from "../../img/tree_3_1x.png";
import tree_4_1x from "../../img/tree_4_1x.png";
import tree_1_1x from "../../img/tree_1_1x.png";
import serverIP from "../../config/config";

import Modal from "../../components/modals/Modal";

export default function ViewDetail({ list, id }) {
  const newData = list.data.studyInfo;
  console.log(newData);

  const [open, setOpen] = useState(false);

  let userId = useSelector((state) => {
    return state.user.id;
  });

  const handleModalView = () => {
    axios.post(`https://${serverIP.serverIP}/api/joinStudy`, {
      study_no: id,
      id: userId,
    });
  };

  const handleImage = (num) => {
    switch (Math.floor(num / 4)) {
      case 1:
        return tree_2_1x;
      case 2:
        return tree_3_1x;
      case 3:
        return tree_4_1x;
      default:
        return tree_1_1x;
    }
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
                <p className="partyMembers">{`${newData.members}/${newData.min_party}`}</p>
              </div>
              <div className="calender">
                {/* 달력 아이콘 */}
                <BsCalendar2WeekFill />
                <p className="deathLine">~ {newData.close_date}</p>
              </div>
            </section>
          </div>
          <div className="headerCircle" style={{ background: "#E47B00" }}>
            <img
              src={handleImage(newData.members)}
              style={{ width: "100px", height: "100px" }}
              alt="viewDetail.js 이미지"
            />
          </div>
        </div>
        <p className="partyDesc">{newData.study_detail}</p>
        {newData.members >= newData.min_party ? (
          <p style={{ textAlign: "center", color: "red" }}>
            모집인원이 가득 찼습니다!
          </p>
        ) : (
          ""
        )}
        <section className="detailCreateBtn">
          <div className="btnBox">
            <button
              className="joinBtn"
              disabled={newData.members >= newData.min_party}
              onClick={() => {
                setOpen(true);
                handleModalView();
              }}
            >
              <p className="join">J-Join</p>
            </button>
            <Modal
              status={1}
              open={open}
              handleClose={setOpen}
              list={newData}
            />
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
    padding: 5px 0 0 1px;
    display: flex;
    align-items: center;
    font-size: 10px;
  }
  .deathLine {
    margin-left: 16px;
  }

  .headerTitle {
    padding-left: 6px;
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  .userName {
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 350;
  }

  .studyName {
    width: 100%;
    font-size: 15px;
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
    margin-top: 47px;
    width: 280px;
    height: 129px;
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
