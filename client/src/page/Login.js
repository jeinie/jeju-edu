import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import fir from "../img/fir.png";
import sec from "../img/sec.png";

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

    axios
      .post("http://13.125.223.194:56742/auth/api/login", body)
      .then((response) => {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1
        style={{ display: "flex", flexDirection: "column", fontSize: "50px" }}
      >
        <img src={fir} alt="서비스 이름" />
      </h1>
      <p style={{ display: "flex", flexDirection: "column", fontSize: "15px" }}>
        <img src={sec} alt="서비스 슬로건" />
      </p>
      <form
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
        onSubmit={onSubmitHandler}
      >
        <TextField
          id="standard-basic"
          label="USERNAME"
          variant="standard"
          onChange={onUserIdHandler}
          style={{ margin: "66px 42px 32px 42px" }}
        />
        <TextField
          id="standard-basic"
          type="password"
          label="PASSWORD"
          variant="standard"
          onChange={onPasswordHandler}
          style={{ marginLeft: "42px", marginRight: "42px" }}
        />

        <br />
        <button
          style={{
            height: "40px",
            borderRadius: "30px",
            background: "black",
            border: "0px",
            color: "white",
            margin: "46px 42px 147px 42px",
          }}
        >
          login
        </button>
      </form>
    </div>
  );
}
