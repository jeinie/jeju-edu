import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

import ViewDetail from "../Main/ViewDetail";
import PartyMarker from "../../components/PartyMarker";
import Input from "./../../components/Input";

export default function PartyDetail({ list }) {
  const { id } = useParams();
  const [personalList, setPersonalList] = useState(null);
  // useEffect(() => {
  //   axios
  //     .post(`http://13.125.223.194:56742/viewDetail/${id}`)
  //     .then((data) => setPersonalList(data));
  // }, []);
  console.log(id);
  // console.log(personalList);
  return (
    <div>
      <PartyMarker lat="33.450317" lon="126.570764" />
      <SearchInputContainer>
        <Input />
      </SearchInputContainer>
      {/* <ViewDetail list={personalList} /> */}
    </div>
  );
}

const SearchInputContainer = styled.div`
  position: relative;
  top: -15px;
  left: 0;
  z-index: 99;
`;
