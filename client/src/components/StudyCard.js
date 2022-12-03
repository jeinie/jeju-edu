import styled from "styled-components";
import { BsSuitHeartFill } from "react-icons/bs";
import { MdPeopleAlt, MdLocationOn } from "react-icons/md";

export default function StudyCard({ item }) {
  return (
    <StudyBox>
      <IconBox>
        <BsSuitHeartFill className="likeBtn" />
      </IconBox>
      <UserName>{item.who_open}</UserName>
      <StudyTitle className="font-bold">{item.study_title}</StudyTitle>
      <div className="partyInfo">
        <div className="partyLocation">
          <MdLocationOn size={16} />
          <p>{item.location /* tmX, tmY값이 넘어옴 location없어짐 */}</p>
        </div>
        <div className="partyMembers">
          <MdPeopleAlt style={{ marginRight: "5px" }} />
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
  }

  .partyLocation {
    float: left;
  }

  .partyMembers {
    float: right;
    height: 16px;
    font-size: 16px;
  }

  .partyMembers svg {
    float: left;
  }

  .partyMembers p {
    float: left;
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
  margin-top: 4px;
  font-size: 16px;
  font-weight: bold;
`;
