import React from "react";
import styled from "styled-components";

import Input from "../../components/Input";
import PartyMarker from "../../components/PartyMarker";
import MainCategory from "../Main/MainCategory";

export default function PartyDetail() {
  return (
    <div>
      <PartyMarker lat="33.450317" lon="126.570764" />
      <SearchInputContainer>
        <Input />
      </SearchInputContainer>
      <MainCategory />
    </div>
  );
}

const SearchInputContainer = styled.div`
  position: relative;
  top: -15px;
  left: 0;
  z-index: 99;
`;
