import styled from "styled-components";

import { BsSuitHeartFill } from "react-icons/bs";
import { MdPeopleAlt, MdLocationOn } from "react-icons/md";

export default function StudyCard({ item }) {
  console.log(item);
  return (
    <StudyBox>
      <IconBox>
        <BsSuitHeartFill className="likeBtn" />
        {/* 하트버튼 */}
      </IconBox>

      <UserName>{item.who_open}</UserName>
      <StudyTitle>{item.study_title}</StudyTitle>
      <div className="partyInfo">
        <div className="partyLocation">
          <MdLocationOn size={16} />
          {/* place 아이콘 */}
          <p>place</p>
          <p>
            {item.studyAt_location /* tmX, tmY값이 넘어옴 location없어짐 */}
          </p>
        </div>
        <div className="partyMembers">
          <MdPeopleAlt className="peopleIcon" />
          <p>{`${item.current_member_cnt} / ${item.min_member_cnt}`}</p>
        </div>
      </div>
    </StudyBox>
  );
}

const StudyBox = styled.div`
  height: 102px;
  margin: 20px;
  padding: 14px 20px;
  position: relative;
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
    justify-content: space-between;
  }

  .partyLocation {
    display: flex;
    justify-content: space-between;
    width: 47%;
  }

  .partyMembers {
    display: flex;
    justify-content: space-between;
    height: 16px;
    font-size: 16px;
  }

  .peopleIcon {
    margin-right: 5px;
    border: none;
  }
`;

const IconBox = styled.div`
  float: right;
  width: 24px;
  height: 24px;
  margin: 10px -10px 0 0;
`;

const UserName = styled.p`
  color: #000000;
  text-align: left;
  font-size: 15px;
  font-weight: 200;
`;

const StudyTitle = styled.p`
  text-align: left;
  color: #000000;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
`;
