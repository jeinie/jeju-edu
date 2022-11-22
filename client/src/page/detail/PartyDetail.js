import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

import ViewDetail from "../Main/ViewDetail";
import PartyMarker from "../../components/maps/PartyMarker";
import serverIP from "../../config/config";

export default function PartyDetail() {
  const { id } = useParams();
  const [personalList, setPersonalList] = useState(null);

  useEffect(() => {
    axios
      .post(`https://${serverIP.serverIP}/viewDetail/${id}`)
      .then((data) => setPersonalList(data));
  }, [id]);

  if (personalList === null) {
    return <div>리스트가 없습니다 !</div>;
  }

  console.log(personalList);
  const local = personalList.data.studyInfo;

  return (
    <div>
      <PartyMarker lat={local.tmX} lon={local.tmY} />
      {/* <SearchInputContainer>
        <AddressInput />
      </SearchInputContainer> */}
      <ViewDetail list={personalList} id={id} />
    </div>
  );
}

const SearchInputContainer = styled.div`
  position: relative;
  top: -15px;
  left: 0;
  z-index: 99;
`;
