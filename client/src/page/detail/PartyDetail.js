import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import backspace from "../../img/back.svg";

import Modal from "../../components/modals/Modal";

export default function PartyDetail() {
  const { id } = useParams();
  const [study, setStudy] = useState({});

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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

  console.log(study);

  return (
    <OutputContainer>
      <Backspace onClick={() => navigate(-1)}>
        <img src={backspace} alt='뒤로가기'></img>
      </Backspace>
      <PartyMarker lat={study.tmX} lon={study.tmY} />
      <ViewDetailContainer>
        <div className='wrapper'>
          <div className='headerLeft'>
            {/* <section className="headerLeftContent"> */}
            <ContainerHeader>
              <div className='headerText'>
                <p className='userName'>@{study.who_open}</p>
                <p className='studyName'>{study.study_title}</p>
              </div>
              <div className='headerCircle'>
                <img className='Seed' src={handleImage(study.members)} alt='viewDetail.js 이미지' />
              </div>
            </ContainerHeader>
            {/* </section> */}
            <PlaceData>
              <div className='memberContainer'>
                <MdPeopleAlt />
                {/* 사람들 아이콘 */}
                <p className='partyMembers'>{`${study.current_member_cnt}/${study.min_member_cnt}`}</p>
              </div>
              <div className='calender'>
                {/* 달력 아이콘 */}
                <BsCalendar2WeekFill />
                <p className='deathLine'>{study.deadline}</p>
              </div>
              <div className='placeAddress'>
                <HiLocationMarker />
                {/* 마커 아이콘 */}
                <p className='address'>{study.studyAt_location}</p>
              </div>
            </PlaceData>
          </div>
          <p className='partyDesc'>{study.study_detail_description}</p>
          {study.study_no >= study.min_member_cnt ? <p className='fullParty'>모집인원이 가득 찼습니다!</p> : ""}
          <DetailCreateBtnBox>
            <div className='btnBox'>
              <button
                className='joinBtn'
                disabled={study.study_no >= study.min_member_cnt}
                onClick={() => {
                  setOpen(true);
                  handleModalView();
                }}
              >
                <p className='join'>J-Join</p>
              </button>
              <Modal status={1} open={open} handleClose={setOpen} list={study} />
            </div>
          </DetailCreateBtnBox>
        </div>
      </ViewDetailContainer>
    </OutputContainer>
  );
}

const Backspace = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 101;
`;

const OutputContainer = styled.section`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 40px;
`;

const ContainerHeader = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .headerText {
    width: 70%;
  }

  .userName {
    margin-bottom: 15px;
    font-size: 12px;
    font-weight: 350;
  }

  .studyName {
    width: 100%;
    font-size: 18px;
    font-weight: 700;
  }

  .Seed {
    width: 87px;
    height: 90px;
  }

  .headerCircle {
    text-align: right;
    width: 78px;
    height: 78px;
    background-color: #e47b00;
    border-radius: 50%;
  }
`;

const PlaceData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  .partyMembers {
    margin-left: 15px;
  }

  .memberContainer {
    margin-top: 15px;
    padding: 0 0 10px 6px;
    display: flex;
    align-items: top;
    justify-content: left;
    font-size: 15px;
    border-bottom: 1px solid #727272;
  }
  /* 여기까지 인원수 */

  .calender {
    margin-top: 15px;
    padding: 5px 0 10px 6px;
    display: flex;
    align-items: top;
    justify-content: left;
    font-size: 15px;
    border-bottom: 1px solid #727272;
  }

  .deathLine {
    margin-left: 16px;
  }
  /* 여기까지 달력 */

  .placeAddress {
    margin-top: 15px;
    padding: 5px 0 10px 6px;
    display: flex;
    align-items: top;
    justify-content: left;
    font-size: 15px;
    border-bottom: 1px solid #727272;
  }

  .address {
    font-size: 15px;
    margin-left: 15px;
  }
`;

const DetailCreateBtnBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 27px;
  width: 90%;

  .btnBox {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: row;
  }

  .joinBtn {
    width: 100%;
    height: 28px;
    color: white;
    background-color: black;
    border: none;
    border-radius: 25px;
  }
`;

const ViewDetailContainer = styled.section`
  padding-top: 35px;

  .fullParty {
    text-align: center;
    color: red;
  }

  .wrapper {
    font-size: 12px;
    margin: 0 20px;
    padding: 0 0 27px 17px;
  }

  .headerLeftContent {
    display: flex;
    margin-bottom: 10px;
  }
  .headerLeft {
    display: flex;
    width: 90%;
    flex-direction: column;
  }

  .headerTitle {
    padding-left: 6px;
    text-align: left;
    display: flex;
    flex-direction: column;
  }

  .partyDesc {
    margin-top: 30px;
    width: 280px;
    height: auto;
    padding: 10px;
  }
`;
