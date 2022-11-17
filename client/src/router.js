import { Route, Routes, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Main from "./page/Main/Main";
import PartyDetail from "./page/detail/PartyDetail";
import PartySearch from "./page/PartySearch";
import Profile from "./page/Profile";
import Login from "./page/Login";
import PartyJoin from "./page/detail/PartyJoin";

const Router = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    axios
      .get("http://13.125.223.194:56742/api/getStudyList")
      .then((data) => setList(data.data));
  }, []);
  if (list === null) {
    return <div>리스트가 없습니다 !</div>;
  }
  return (
    <Routes>
      <Route path="/" element={<Main list={list} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/PartyJoin" element={<PartyJoin />} />
      <Route path={`/PartyDetail/:id`} element={<PartyDetail />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/PartySearch" element={<PartySearch />} />
    </Routes>
  );
};

export default Router;
