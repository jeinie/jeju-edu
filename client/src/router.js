import { Route, Routes } from "react-router-dom";

import Main from "./page/Main";
import PartyDetail from "./page/PartyDetail";
import PartySearch from "./page/PartySearch";
import Profile from "./page/Profile";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/PartyDetail" element={<PartyDetail />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/PartySearch" element={<PartySearch />} />
    </Routes>
  );
};

export default Router;
