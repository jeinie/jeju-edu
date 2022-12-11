import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// import TextField from "@mui/material/TextField";

import fir from "../../img/fir.png";
import sec from "../../img/sec.png";

import { saveUser } from "../../store/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onUserIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      id: userId,
      pw: password,
    };

    axios.post(`/api/auth/login`, body).then((response) => {
      if (response.data.code === 200) {
        dispatch(saveUser(response.data.userInfo));
        navigate("/");
      } else {
        alert(response.data.message);
      }
    });
  };

  return (
    <LoginContainer>
      <form className="submitForm" onSubmit={onSubmitHandler}>
        <div className="LoginHeader">
          <h1 className="serviceName">
            <img src={fir} alt="서비스 이름" />
          </h1>
          <p className="serviceSlogan">
            <img src={sec} alt="서비스 슬로건" />
          </p>
        </div>
        <div className="LoginData">
          <IdContainer>
            <input
              type="id"
              name="id"
              className="userId"
              placeholder="아이디"
              onChange={onUserIdHandler}
            />
          </IdContainer>
          <PwContainer>
            <input
              type="password"
              name="pw"
              className="userPw"
              onChange={onPasswordHandler}
              placeholder="비밀번호"
            />
          </PwContainer>
          <p className="lostPw">비밀번호를 잊으셨나요?</p>
          {/* css display:none 되어 있습니다.  */}
        </div>
        <div className="BtnBox">
          <button className="loginBtn">로그인</button>
          <button className="signInBtn">회원가입</button>
        </div>
      </form>
    </LoginContainer>
  );
}

const IdContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  .userId {
    width: 60%;
    height: 42px;
    box-sizing: border-box;

    border-radius: 21px;
    padding: 10px;
    border: none;
  }
`;

const PwContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 31px;

  .userPw {
    box-sizing: border-box;
    width: 60%;
    height: 42px;
    border-radius: 21px;
    padding: 10px;
    border: none;
  }
`;

const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #faf6f2;

  .LoginData {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .serviceName {
    display: flex;
    flex-direction: column;
    font-size: 50px;
  }

  .serviceSlogan {
    display: flex;
    flex-direction: column;
    font-size: 15px;
  }

  .submitForm {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    height: 80vh;
  }

  .lostPw {
    display: none;

    width: 60%;
    text-align: right;
    margin-top: 10px;
    font-size: 10px;
  }

  .BtnBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
  }

  .loginBtn {
    width: 60%;
    height: 40px;
    border-radius: 30px;
    background-color: #e47b00;
    color: white;
    border: none;
  }

  .signInBtn {
    width: 60%;
    height: 40px;
    border-radius: 30px;
    background-color: white;
    color: #e47b00;
    border: 1px solid #e47b00;
    margin-top: 12px;
  }
`;
