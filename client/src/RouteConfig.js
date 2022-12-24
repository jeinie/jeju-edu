import React from "react";

const LayoutMainPage = React.lazy(() => import("./layouts/LayoutMainPage"));
const Main = React.lazy(() => import("./page/Main/Main"));
const Profile = React.lazy(() => import("./page/profile/Profile"));

const LayoutDetailPage = React.lazy(() => import("./layouts/LayoutDetailPage"));
const PartyJoin = React.lazy(() => import("./page/detail/PartyJoin"));
const PartyDetail = React.lazy(() => import("./page/detail/PartyDetail"));
const Account = React.lazy(() => import("./page/account/Account"));
const Login = React.lazy(() => import("./page/login/Login"));
const Join = React.lazy(() => import("./page/Join"));
const ChangePw = React.lazy(() => import("./page/ChangePw"));

const AddressInput = React.lazy(() => import("./components/maps/AddressInput"));
const TransFormAddress = React.lazy(() =>
  import("./components/maps/PartyMarker")
);

export const RouterConfig = [
  {
    path: "/",
    element: <LayoutMainPage />,
    sceneConfig: {
      enter: "from-fade",
      exit: "to-fade",
    },
  },
  {
    path: "/home",
    element: <Main />,
    sceneConfig: {
      enter: "from-left",
      exit: "to-left",
    },
  },
  {
    path: "/profile",
    element: <Profile />,
    sceneConfig: {
      enter: "from-right",
      exit: "to-right",
    },
  },
  {
    path: "/detail",
    element: <LayoutDetailPage />,
    sceneConfig: {
      enter: "from-bottom",
      exit: "to-bottom",
    },
  },
  {
    path: "/detail/partydetail/:id",
    element: <PartyDetail />,
    sceneConfig: {
      enter: "from-bottom",
      exit: "to-bottom",
    },
  },
  {
    path: "/detail/partyjoin",
    element: <PartyJoin />,
    sceneConfig: {
      enter: "from-bottom",
      exit: "to-bottom",
    },
  },
  {
    path: "/detail/acount",
    element: <Account />,
    sceneConfig: {
      enter: "from-bottom",
      exit: "to-bottom",
    },
  },
  {
    path: "/detail/login",
    element: <Login />,
    sceneConfig: {
      enter: "from-fade",
      exit: "to-fade",
    },
  },
  {
    path: "/detail/join",
    element: <Join />,
    sceneConfig: {
      enter: "from-fade",
      exit: "to-fade",
    },
  },
  {
    path: "/detail/changepw",
    element: <ChangePw />,
    sceneConfig: {
      enter: "from-bottom",
      exit: "to-bottom",
    },
  },
  {
    path: "/detail/mapaddress",
    element: <AddressInput />,
    sceneConfig: {
      enter: "from-bottom",
      exit: "to-bottom",
    },
  },
  {
    path: "/detail/maplocation",
    element: <TransFormAddress />,
    sceneConfig: {
      enter: "from-bottom",
      exit: "to-bottom",
    },
  },
];
