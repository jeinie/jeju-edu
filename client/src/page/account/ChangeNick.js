import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button } from "../../components/form";
import styled from "styled-components";
import { BsChevronLeft } from "react-icons/bs";

import axios from "axios";
import LayoutDetailPage from "../../layouts/LayoutDetailPage";
/**
 * 2022-12-23 mkchoi
 * 닉네임 변경
 */
export default function ChangeNick() {
  const navigate = useNavigate();

  const id = useSelector((state) => state.user.id);
  const [newNick, setNewNick] = useState("");

  useEffect(() => {
    console.log(newNick);
  }, [newNick]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const handleSubmit = () => {
      const body = {
        id: id,
        newNick: newNick,
      };

      //닉네임 변경 API 필요
      axios.post(`/api/auth/message/modifyPW`, body).then((response) => {
        if (response.data.code === 200) {
          alert("변경완료");
          //   navigate("/login");
        } else if (response.data.code === 202) {
          //   setPwOk(false);
          //   setPwDesc({ type: "WARN", text: "현재 비밀번호가 아니에요" });
        } else {
          alert("변경실패 : 서버오류");
        }
      });
    };
  };

  return (
    <LayoutDetailPage>
      <ChangeNickContainer>
        <ChangeNickForm onSubmit={handleSubmit}>
          <Input
            label='닉네임*'
            placeholder='닉네임을 입력해주세요.'
            value={newNick || ""}
            setValue={setNewNick}
            style={{ marginBottom: "20px", marginTop: "52px" }}
            maxLength={16}
          />

          <Button text='닉네임 변경하기' style={{ position: "absolute", bottom: "20px" }} disabled={!newNick} />
        </ChangeNickForm>
      </ChangeNickContainer>
    </LayoutDetailPage>
  );
}
const ChangeNickForm = styled.form`
  margin: 32px 32px;
  display: block;
  height: calc(100% - 100px);
  position: relative;
  .header-goback {
    float: left;
    color: #727272;
  }
  .header-title {
    text-align: center;
  }
`;

const ChangeNickContainer = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 60px);
  width: 100%;
  position: absolute;
  background: #faf6f2;
  background-size: cover;
`;
