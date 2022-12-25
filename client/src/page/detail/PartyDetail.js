import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import PartyMarker from '../../components/maps/PartyMarker';

import { HiLocationMarker } from 'react-icons/hi';
import { MdPeopleAlt } from 'react-icons/md';
import { BsCalendar2WeekFill } from 'react-icons/bs';

import tree_2_1x from '../../img/tree_2_1x.png';
import tree_3_1x from '../../img/tree_3_1x.png';
import tree_4_1x from '../../img/tree_4_1x.png';
import tree_1_1x from '../../img/tree_1_1x.png';
import backspace from '../../img/back.svg';

import Modal from '../../components/modals/Modal';
import LayoutDetailPage from '../../layouts/LayoutDetailPage';
import Footer from '../../components/Footer';

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
    <LayoutDetailPage top="0">
      <OutputContainer>
        <div className="headerWrapper">
          <Backspace onClick={() => navigate(-1)}>
            <img src={backspace} alt="뒤로가기"></img>
          </Backspace>
          <PartyMarker lat={study.tmX} lon={study.tmY} />
        </div>
        <ViewDetailContainer>
          <div className="wrapper">
            <div className="headerLeft">
              <ContainerHeader>
                <div className="headerText">
                  <p className="userName">@{study.who_open}</p>
                  <p className="studyName">{study.study_title}</p>
                </div>
              </ContainerHeader>
              <PlaceData>
                <div className="memberContainer">
                  <MdPeopleAlt />
                  {/* 사람들 아이콘 */}
                  <p className="partyMembers">{`${study.current_member_cnt}/${study.min_member_cnt}`}</p>
                </div>
                <div className="calender">
                  {/* 달력 아이콘 */}
                  <BsCalendar2WeekFill />
                  <p className="deathLine">{study.deadline}</p>
                </div>
                <div className="placeAddress">
                  <HiLocationMarker />
                  {/* 마커 아이콘 */}
                  <p className="address">{study.studyAt_location}</p>
                </div>
              </PlaceData>
            </div>
            <p className="partyDesc">{study.study_detail_description}</p>
            {study.study_no >= study.min_member_cnt ? (
              <p className="fullParty">모집인원이 가득 찼습니다!</p>
            ) : (
              ''
            )}
          </div>
        </ViewDetailContainer>
        <DetailCreateBtnBox>
          <div className="btnBox">
            <button
              className="joinBtn"
              disabled={study.study_no >= study.min_member_cnt}
              onClick={() => {
                setOpen(true);
                // handleModalView();
              }}
            >
              <p className="join">J-Join</p>
            </button>
            <Modal status={1} open={open} handleClose={setOpen} list={study} />
          </div>
        </DetailCreateBtnBox>
        <Footer />
      </OutputContainer>
    </LayoutDetailPage>
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
  background-color: #faf6f2;

  .headerWrapper {
    height: 212px;
  }
`;

const ContainerHeader = styled.section`
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
    line-height: 15px;
    margin: 0 20px 0 15px;
  }
`;

const DetailCreateBtnBox = styled.div`
  .btnBox {
    position: fixed;
    left: 24px;
    bottom: 70px;
    width: 90%;
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
  z-index: 10;
  border-radius: 22px;
  background-color: #faf6f2;
  /* transform: translate(0, -25px); */
  position: relative;
  top: -20px;
  left: 0;

  .fullParty {
    text-align: center;
    color: red;
  }

  .wrapper {
    font-size: 12px;
    padding: 0 24px;
  }

  .partyDesc {
    margin-top: 30px;
    width: 280px;
    height: 100%;
    padding: 10px;
  }
`;
