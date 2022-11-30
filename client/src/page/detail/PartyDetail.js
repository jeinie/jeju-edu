import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ViewDetail from "../Main/ViewDetail";
import PartyMarker from "../../components/maps/PartyMarker";

export default function PartyDetail() {
  const { id } = useParams();
  const [personalList, setPersonalList] = useState(null);

  useEffect(() => {
    axios.post(`/api/viewDetail/${id}`).then((data) => setPersonalList(data));
  }, [id]);

  if (personalList === null) {
    return <div>리스트가 없습니다 !</div>;
  }

  console.log(personalList);
  const local = personalList.data.studyInfo;

  return (
    <div>
      <PartyMarker lat={local.tmX} lon={local.tmY} />
      <ViewDetail list={personalList} id={id} />
    </div>
  );
}
