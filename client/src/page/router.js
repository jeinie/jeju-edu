import { Route, Routes } from "react-router-dom";

import Main from "./Main/Main";
import PartyDetail from "./detail/PartyDetail";
import Profile from "./profile/Profile";
import Login from "./login/Login";
import PartyJoin from "./detail/PartyJoin";
import Footer from "../components/Footer";

const Router = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Main/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/partyjoin" element={<PartyJoin />} />
        <Route path={`/partydetail/:id`} element={<PartyDetail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
