import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import ViewDetail from "../Main/ViewDetail";
import PartyMarker from "../../components/PartyMarker";
import Input from "./../../components/Input";

export default function PartyDetail({ list }) {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <PartyMarker lat="33.450317" lon="126.570764" />
      <SearchInputContainer>
        <Input />
      </SearchInputContainer>
      <ViewDetail list={list} />
    </div>
  );
}

const SearchInputContainer = styled.div`
  position: relative;
  top: -15px;
  left: 0;
  z-index: 99;
`;
