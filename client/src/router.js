import { Route, Routes, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Main from "./page/Main/Main";
import PartyDetail from "./page/detail/PartyDetail";
import PartySearch from "./page/PartySearch";
import Profile from "./page/Profile";
import Login from "./page/Login";
import PartyJoin from "./page/detail/PartyJoin";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";

const categoryList = ["code", "sing", "design"];

const Router = () => {
  const [list, setList] = useState(null);
  const [category, setCategory] = useState(0);

  let userId = useSelector((state) => {
    return state.user.id;
  });
  console.log(userId);

  useEffect(() => {
    axios
      .get(`http://3.36.68.46:56526/api/getStudyList/${categoryList[category]}`)
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
        <Route path="/PartySearch" element={<PartySearch />} />
      </Routes>
      {userId ? <Footer /> : <></>}
    </>
  );
};

export default Router;
