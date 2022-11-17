import Nav from "../../components/Nav";
import DateTime from "../../components/DateTime";
import axios from "axios";

export default function PartyJoin() {
  const onSubmitHandler = () => {
    axios.post("");
  };

  return (
    <div>
      <Nav />
      <div style={{ marginLeft: "25px", marginRight: "25px" }}>
        <form onSubmit={onSubmitHandler} style={{ marginTop: "20px" }}>
          <Input
            labelName="스터디 이름"
            placeholder="스터디 이름을 입력해주세요"
            style={{ marginTop: "15px" }}
          />
          <DateTime
            labelName="스터디 날짜"
            placeholder="스터디 날짜를 선택해주세요"
            margin={{ my: "25px" }}
          />
          <DateTime
            labelName="모집 마감 날짜"
            placeholder="모집 마감 날짜를 선택해주세요"
            margin={{ mb: "25px" }}
          />
          <Input labelName="스터디 장소" />
          <label style={{ marginTop: "25px" }}>스터디 상세설명</label>
          <textarea
            style={{ width: "100%" }}
            placeholder="스터디를 설명해주세요"
          />
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
