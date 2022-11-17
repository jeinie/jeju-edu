import { useState } from "react";
import Nav from "../../components/Nav";
import DateTime from "../../components/DateTime";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PartyJoin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    study_name: "",
    who_open: "",
    study_category: "",
    study_detail: "",
    members: "",
    min_party: "",
    open_date: new Date(),
    close_date: null,
    study_date: null,
    location: "",
    tmX: "",
    tmY: "",
    deadline: new Date(),
  });

  const onSubmitHandler = () => {
    axios
      .post("http://13.125.223.194:56742/openStudy", formData)
      .then((response) => {
        console.log(response.data);
        navigate(`/Profile`);
      });
  };

  return (
    <div>
      <Nav />
      <div style={{ marginLeft: "25px", marginRight: "25px" }}>
        <form onSubmit={onSubmitHandler} style={{ marginTop: "20px" }}>
          <Input
            name="study_name"
            labelName="스터디 이름"
            placeholder="스터디 이름을 입력해주세요"
            style={{ marginTop: "15px" }}
          />
          <label>스터디 날짜</label>
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
            style={{ width: "100%" }}
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
    </div>
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
