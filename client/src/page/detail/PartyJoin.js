import { useState } from "react";
import Nav from "../../components/Nav";
import DateTime from "../../components/DateTime";
import axios from "axios";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../../components/Footer";
import serverIP from '../../../config/config';
export default function PartyJoin() {
  const [open, setOpen] = useState(false);
  let userId = useSelector((state) => {
    return state.user.id;
  });

  const [formData, setFormData] = useState({
    study_name: "피아노",
    who_open: userId,
    study_category: "보컬댄스",
    study_detail: "피아노를 가르켜줄게요",
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

    axios
      .post(`http://${serverIP.serverIP}/api/openStudy`, formData)
      .then((response) => {
        console.log(response);
        setOpen(true);
      });
  };

  return (
    <MainStyle>
      <p className="title">스터디 개설하기</p>
      <Nav />
      <div style={{ marginLeft: "25px", marginRight: "25px" }}>
        <form onSubmit={onSubmitHandler} style={{ marginTop: "20px" }}>
          <Input
            name="study_name"
            labelName="스터디 이름"
            placeholder="스터디 이름을 입력해주세요"
            style={{ marginTop: "15px" }}
          />
          <label className="studyDate">스터디 날짜</label>
          <DateTime
            name="study_date"
            labelName="스터디 날짜"
            placeholder="스터디 날짜를 선택해주세요"
            margin={{ my: "25px" }}
          />
          <label>모집 마감 날짜</label>
          <DateTime
            name="deadline"
            labelName="모집 마감 날짜"
            placeholder="모집 마감 날짜를 선택해주세요"
            margin={{ mb: "25px" }}
          />
          <Input
            labelName="스터디 장소"
            placeholder="스터디 장소를 알려주세요"
          />
          <label style={{ marginTop: "25px" }}>스터디 상세설명</label>
          <textarea
            style={{ width: "100%", height: "117px" }}
            placeholder="스터디를 설명해주세요"
          />
          <button
            style={{
              height: "35px",
              borderRadius: "30px",
              background: "black",
              border: "0px",
              color: "white",
              marginTop: "20px",
              width: "100%",
            }}
          >
            스터디 개설 완료하기
          </button>
        </form>
      </div>
      <div className="modalLayout">
        <Modal open={open} handleClose={setOpen} status={0} />
      </div>
      <div className="layout">
        <Footer />
      </div>
    </MainStyle>
  );
}

const Input = (props) => {
  return (
    <>
      <label>{props.labelName}</label>
      <input
        style={{
          width: "100%",
          height: "33px",
          borderRadius: "15px",
          border: "0px",
        }}
        placeholder={props.placeholder}
      ></input>
    </>
  );
};

const MainStyle = styled.main`
  background-color: white;

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
    /* border-bottom: 1px solid black; */
  }
  input {
    background-color: #faf6f2;
    width: 100%;
    border-radius: 16px;
    padding: 15px;
    border: none;
  }

  .layout {
    /* transform: translateY(100px); */
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
`;
