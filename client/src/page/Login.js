import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

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
        서비스명
      </h1>
      <p style={{ display: "flex", flexDirection: "column", fontSize: "15px" }}>
        서비스 슬로건
      </p>
      <form
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
        onSubmit={onSubmitHandler}
      >
        <label>USERNAME</label>
        <input
          style={{
            height: "30px",
            marginBottom: "40px",
            borderRadius: "15px",
            borderBottom: "1px solid black",
            lineHeight: "0.5",
          }}
          type="userId"
          value={userId}
          onChange={onUserIdHandler}
        />
        <label>PASSWORD</label>
        <input
          style={{
            height: "30px",
            marginBottom: "50px",
            borderRadius: "15px",
            background: "#E47B00",
            border: "0px",
          }}
          type="password"
          value={password}
          onChange={onPasswordHandler}
        />
        <br />
        <button
          style={{
            height: "40px",
            borderRadius: "30px",
            background: "#E47B00",
            border: "0px",
            color: "white",
          }}
        >
          login
        </button>
      </form>
    </div>
  );
}
