import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";

import Nav from "../../components/Nav";
import DateTime from "../../components/DateTime";
import Modal from "../../components/modals/Modal";
import Footer from "../../components/Footer";

export default function PartyJoin() {
  const { kakao } = window;
  const [open, setOpen] = useState(false);

  const partyName = useRef(); // 스터디 이름
  const partyDate = useRef(); // 스터디 모임 날짜
  const partyClose = useRef(); // 스터디 모짐마감 날짜
  const partyAddress = useRef(); // 스터디 모임 장소
  const partyDesc = useRef(); // 스터디 상세설명
  let latLng; // 사용자가 입력한 주소의 위도값
  let lonLng; // 사용자가 입력한 주소의 경도값.

  let userId = useSelector((state) => {
    return state.user.id;
  });

  const [formData, setFormData] = useState({
    study_name: "피아노",
    // partyName
    who_open: userId,
    study_category: "보컬댄스",
    study_detail: "피아노를 가르켜줄게요",
    //partyDesc
    members: 0,
    min_party: 4,
    open_date: new Date(),
    close_date: null,
    study_date: null,
    location: "",
    tmX: 33.449794,
    tmY: 126.918436,
    deadline: new Date(),
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();

    axios.post(`/api/openStudy`, formData).then((response) => {
      console.log(response);
      setOpen(true);
    });
  };

  const refCheck = () => {
    console.log(
      partyName.current.value,
      partyDate.current.value,
      partyClose.current.value,
      partyAddress.current.value,
      // 위도 경도는 받아오고, TransformAddress 함수 적용할것.
      partyDesc.current.value,
      latLng,
      lonLng
    );
  };

  const handleAddressTransformLocation = (e) => {
    e.preventDefault();
    let location = partyAddress.current.value;
    let geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(`${location}`, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        console.log(coords);
        latLng = coords.Ma;
        lonLng = coords.La;
        console.log(latLng, lonLng);
      } else {
        console.log("err");
      }
    });
  };

  return (
    <MainStyle>
      <p className="title">스터디 개설하기</p>
      <Nav />
      <button onClick={refCheck}>ref 확인</button>
      <div className="wrapper">
        <form className="createParty">
          <div className="partName">
            <label htmlFor="study_name">스터디 이름</label>
            <InputStyle
              ref={partyName}
              placeholder="스터디 이름을 입력해주세요"
              name="study_name"
            />
          </div>

          {/* 확인필요 - 스터디 모집날짜 input 변경 */}
          <label className="studyDate" htmlFor="studyDate">
            스터디 날짜
          </label>
          <input
            ref={partyDate}
            placeholder="테스트용 input"
            name="studyDate"
            type="datetime-local"
          />
          {/* <label className="studyDate">스터디 날짜</label>
          <DateTime
            name="study_date"
            labelName="스터디 날짜"
            placeholder="스터디 날짜를 선택해주세요"
            margin={{ my: "25px" }}
            ref={partyDate}
          /> */}

          {/* 확인필요 - 스터디 마감날짜 input 변경 */}
          <label htmlFor="studyClose">모집 마감 날짜</label>
          <input
            name="studyClose"
            ref={partyClose}
            placeholder="테스트용 input"
            type="datetime-local"
          />
          {/* <label>모집 마감 날짜</label>
          <DateTime
            name="deadline"
            labelName="모집 마감 날짜"
            placeholder="모집 마감 날짜를 선택해주세요"
            margin={{ mb: "25px" }}
            ref={partyClose}
          /> */}

          <div className="partName">
            <label htmlFor="location">스터디 장소</label>
            <InputStyle
              ref={partyAddress}
              placeholder="스터디 장소를 입력해주세요"
              name="location"
            />
            <button
              className="addressChecked"
              onClick={(e) => handleAddressTransformLocation(e)}
            >
              주소확인
            </button>
          </div>

          <label className="partyDescLabel">스터디 상세설명</label>
          <textarea
            ref={partyDesc}
            className="partyDesc"
            placeholder="스터디를 설명해주세요"
          />
          <button className="finish" onClick={onSubmitHandler}>
            스터디 개설 완료하기
          </button>
        </form>
      </div>
      <div className="modalLayout">
        <Modal open={open} handleClose={setOpen} status={0} />
      </div>
      <div>
        <Footer />
      </div>
    </MainStyle>
  );
}

const InputStyle = styled.input`
  width: 100%;
  height: 33px;
  border-radius: 15px;
  border: none;
`;

const MainStyle = styled.main`
  background-color: white;

  .wrapper {
    margin: 0 25px;
  }

  .createParty {
    margin-top: 20px;
  }

  .modalLayout {
    width: 100%;
    height: auto;
    padding-bottom: 100px;
  }

  .title {
    margin: 0 20px;
    width: 90%;
    text-align: center;
    font-weight: bold;
    padding: 25px 0 9px 0;
  }
  input {
    background-color: #faf6f2;
    width: 100%;
    border-radius: 16px;
    padding: 15px;
    border: none;
  }

  div {
    border: none;
  }

  .studyDate {
    margin-top: 8px;
    transform: translateY(20px);
  }
  textarea {
    background-color: #faf6f2;
    border: none;
    padding: 15px;
  }

  .partyName {
    margin-top: 15px;
  }

  .partyDescLabel {
    margin-top: 25px;
  }

  .partyDesc {
    width: 100%;
    height: 117px;
  }

  .finish {
    width: 100%;
    height: 35px;
    border-radius: 30px;
    background-color: black;
    border: none;
    color: white;
    margin-top: 20px;
  }
`;
