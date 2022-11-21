import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Main from "./Main/Main";
import PartyDetail from "./detail/PartyDetail";
// import PartySearch from "./page/PartySearch";
import Profile from "./profile/Profile";
import Login from "./login/Login";
import PartyJoin from "./detail/PartyJoin";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import serverIP from "../config/config";

const categoryList = ["code", "sing", "design"];
const Router = () => {
  const [list, setList] = useState(null);
  const [category, setCategory] = useState(0);

  let userId = useSelector((state) => {
    return state.user.id;
  });
  // console.log(userId);

  useEffect(() => {
    axios
      .get(
        `http://${serverIP.serverIP}/api/getStudyList/${categoryList[category]}`
      )
      .then((data) => setList(data.data));
  }, [category]);
  if (list === null) {
    return <div>리스트가 없습니다 !</div>;
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Main list={list} update={setList} updateCategory={setCategory} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/PartyJoin" element={<PartyJoin />} />
        <Route path={`/PartyDetail/:id`} element={<PartyDetail />} />
        {/* <Route path="/PartySearch" element={<PartySearch />} /> */}
      </Routes>
      {userId ? <Footer /> : <></>}
    </>
  );
};

export default Router;
