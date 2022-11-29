import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Main from "./Main/Main";
import PartyDetail from "./detail/PartyDetail";
import Profile from "./profile/Profile";
import Login from "./login/Login";
import PartyJoin from "./detail/PartyJoin";
import Footer from "../components/Footer";

const categoryList = ["code", "sing", "design"];
const Router = () => {
  const [list, setList] = useState(null);
  const [category, setCategory] = useState(0);

  let userId = useSelector((state) => {
    return state.user.id;
  });
  console.log(userId);

  useEffect(()=>{
    console.log("dasd");
    axios.get('/api/hello').then(res => console.log(res));
  },[]);
/*
  useEffect(() => {
    axios
      .get(
        `/api/getStudyList/${categoryList[category]}`
      )
      .then((data) => {
        console.log(data);
        setList(data.data);
      });
  }, [category]);
  */
  if (list === null) {
    return <div>리스트가 없습니다 !</div>;
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              list={list}
              update={setList}
              updateCategory={setCategory}
              userId={userId}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/partyjoin" element={<PartyJoin />} />
        <Route path={`/partydetail/:id`} element={<PartyDetail />} />
      </Routes>
      {userId ? <Footer /> : <></>}
      {/* userId 가 null 값이여도 있음. 해당코드 수정필요. */}
    </>
  );
};

export default Router;
