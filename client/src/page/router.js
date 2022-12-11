import { Route, Routes } from "react-router-dom";

import Main from "./Main/Main";
import PartyDetail from "./detail/PartyDetail";
import Profile from "./profile/Profile";
import Login from "./login/Login";
import Join from "./Join";
import PartyJoin from "./detail/PartyJoin";
import Footer from "../components/Footer";
import Logout from "../components/Logout";

const Router = () => {
  return (
    <>
      <Logout />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/partyjoin" element={<PartyJoin />} />
        <Route path="/partydetail/:id" element={<PartyDetail />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
