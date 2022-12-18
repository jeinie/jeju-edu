import styled from "styled-components";

import { BsSuitHeartFill } from "react-icons/bs";
import { MdPeopleAlt, MdLocationOn } from "react-icons/md";
import React from "react";

export default function StudyCard({ item }) {
  console.log(item);
  return (
    <StudyBox>
      <IconBox>
        <StudyTitle>{item.study_title}</StudyTitle>
        <div className="deadLine">D-</div>
      </IconBox>
      <div className="partyInfo">
        <div className="partyLocation">
          <MdLocationOn />
          {/* place 아이콘 */}
          <p className="partyLocationAddress">{item.studyAt_location}</p>
        </div>
        <div className="partyMembers">
          <div className="peopleGraph">
            <div className="peopleGraphCount"></div>
          </div>
          <div className="peopleCount">
            <MdPeopleAlt className="peopleIcon" />
            <p>{`${item.current_member_cnt} / ${item.min_member_cnt}`}</p>
          </div>
        </div>
      </div>
    </StudyBox>
  );
}

const StudyBox = styled.div`
  height: 102px;
  margin: 20px;
  padding: 14px 20px;
  background: #f4ede7;
  border-radius: 15px;

  .likeBtn {
    color: lightGray;
  }
  .font {
    margin-top: 20px;
  }
  .partyInfo {
    font-size: 12px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .partyLocation {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 47%;

    .partyLocationAddress {
      margin-left: 10px;
    }
  }

  .partyMembers {
    display: flex;
    justify-content: space-between;
    height: 16px;
    font-size: 16px;
    padding-top: 18px;
  }

  .peopleIcon {
    border: none;
  }

  .peopleCount {
    width: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .peopleGraph {
    width: 75%;
    border: 1px solid black;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 0;
    overflow: hidden;
  }
  .peopleGraphCount {
    width: 70%;
    height: 120%;
    background-color: black;
    border-radius: 3px;
    box-sizing: border-box;
  }
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 17px;

  .deadLine {
    color: white;
    background-color: black;
    border-radius: 8px;
    width: 20%;
    height: 100%;
    text-align: center;
  }
`;

const StudyTitle = styled.p`
  text-align: left;
  color: #000000;
  font-size: 15px;
  font-weight: bold;
`;
