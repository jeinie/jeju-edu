import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import TextField from "@mui/material/TextField";

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
      password: password,
    };

    axios.post(`/api/auto/login`, body).then((response) => {
      console.log(response.data);
      if (response.data.success === 200) {
        dispatch(saveUser(response.data.userInfo));
        navigate("/");
      } else {
        alert(response.data.msg);
      }
    });
  };

  return (
    <LoginContainer>
      <h1 className="serviceName">
        <img src={fir} alt="서비스 이름" />
      </h1>
      <p className="serviceSlogan">
        <img src={sec} alt="서비스 슬로건" />
      </p>
      <form className="submitForm" onSubmit={onSubmitHandler}>
        <TextField
          className="userId"
          id="standard-basic"
          label="USERNAME"
          variant="standard"
          onChange={onUserIdHandler}
        />
        <TextField
          className="userPw"
          id="standard-basic"
          type="password"
          label="PASSWORD"
          variant="standard"
          onChange={onPasswordHandler}
        />

        <br />
        <button className="loginBtn">login</button>
      </form>
    </LoginContainer>
  );
}

const LoginContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

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
    margin-top: 20px;
  }

  .userId {
    margin: 66px 42px 32px;
  }

  .userPw {
    margin: 0 42px;
  }

  .loginBtn {
    height: 40px;
    border-radius: 30px;
    background-color: black;
    border: none;
    color: white;
    margin: 46px 42px 147px;
  }
`;
