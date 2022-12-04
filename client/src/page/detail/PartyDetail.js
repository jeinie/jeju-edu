import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";

import PartyMarker from "../../components/maps/PartyMarker";

import { HiLocationMarker } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";
import { BsCalendar2WeekFill } from "react-icons/bs";

import tree_2_1x from "../../img/tree_2_1x.png";
import tree_3_1x from "../../img/tree_3_1x.png";
import tree_4_1x from "../../img/tree_4_1x.png";
import tree_1_1x from "../../img/tree_1_1x.png";

import Modal from "../../components/modals/Modal";

export default function PartyDetail() {
  const { id } = useParams();
  const [study, setStudy] = useState({});

  const [open, setOpen] = useState(false);

  let userId = useSelector((state) => {
    return state.user.id;
  });

  const handleModalView = () => {
    axios.post(`/api/joinStudy`, {
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

  useEffect(() => {
    axios.post(`/api/viewDetail/${id}`).then((res) => setStudy(res.data.study_Detail_Info));
  }, []);

  return (
    <div>
      <PartyMarker lat={study.tmX} lon={study.tmY} />
      <ViewDetailContainer>
        <div className="wrapper">
          <div className="containerHeader">
            <div className="headerLeft">
              <section className="headerLeftContent">
                <div className="headerTitle">
                  <p className="userName">{study.who_open}</p>
                  <p className="studyName">{study.study_title}</p>
                </div>
              </section>
              <section className="placeData">
                <div className="placeAddress">
                  <HiLocationMarker />
                  {/* 마커 아이콘 */}
                  <h6 className="addressTitle">place</h6>
                  <p className="address">{study.studyAt_location}</p>
                </div>
                <div className="memberContainer">
                  <MdPeopleAlt />
                  {/* 사람들 아이콘 */}
                  <p className="partyMembers">{`${study.current_member_cnt}/${study.min_member_cnt}`}</p>
                </div>
                <div className="calender">
                  {/* 달력 아이콘 */}
                  <BsCalendar2WeekFill />
                  <p className="deathLine">~ {study.deadline}</p>
                </div>
              </section>
            </div>
            <div
              className="headerCircle"
              // style={{ background: "#E47B00" }}
            >
              <img
                className="Seed"
                src={handleImage(study.members)}
                // style={{ width: "100px", height: "100px" }}
                alt="viewDetail.js 이미지"
              />
            </div>
          </div>
          <p className="partyDesc">{study.study_detail}</p>
          {study.members >= study.min_party ? (
            <p
              className="fullParty"
              // style={{ textAlign: "center", color: "red" }}
            >
              모집인원이 가득 찼습니다!
            </p>
          ) : (
            ""
          )}
          <section className="detailCreateBtn">
            <div className="btnBox">
              <button
                className="joinBtn"
                disabled={study.members >= study.min_party}
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
                list={study}
              />
            </div>
          </section>
        </div>
      </ViewDetailContainer>
    </div>
  );
}

const ViewDetailContainer = styled.section`
  padding-top: 35px;

  .Seed {
    width: 100px;
    height: 100px;
  }

  .fullParty {
    text-align: center;
    color: red;
  }

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
    background-color: #e47b00;
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
