import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdPeopleAlt } from "react-icons/md";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import tree_1_1x from "../img/tree_1_1x.png";
import tree_2_1x from "../img/tree_2_1x.png";
import tree_3_1x from "../img/tree_3_1x.png";
import tree_4_1x from "../img/tree_4_1x.png";
import axios from "axios";
import { useSelector } from "react-redux";
import serverIP from "../config/config";
const statusList = [
  {
    title: "스터디가 만들어졌어요!",
    detail: "이제 내 나무에 물을 줄",
    detail2: "스터디원을 기다리면 돼요!",
    link_title: "링크로 홍보하기",
    link: "/Profile",
  },
  {
    title: "스터디에 참여완료!",
    detail: "이제 내 나무에 물을 줄",
    detail2: "스터디원을 기다리면 돼요!",
    link_title: "다른 스터디 보러가기",
    link: "/Profile",
  },
  {
    title: "스터디 종료!",
    detail: "오늘도 보람찬 하루를 보내셨군요:)",
    detail2: "수확에 성공했어요!",
    link_title: "수확 현황 확인하러가기",
    link: "/Profile",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};

export default function BasicModal(props) {
  const navigate = useNavigate();
  const move = () => navigate(statusList[props.status]["link"]);
  const [members, setMembers] = useState(props.list ? props.list.members : 0);
  let userId = useSelector((state) => {
    return state.user.id;
  });

  useEffect(() => {
    axios
      .post(`/api/joinStudy`, {
        study_no: props.list?.study_no,
        id: userId,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === 200) {
          setMembers(response.data.members);
        }
      });
  }, []);

  const handleImage = (num) => {
    switch (Math.floor(num / 4)) {
      case 1:
        return tree_2_1x;
      case 2:
        return tree_3_1x;
      case 3:
        return tree_4_1x;
      default:
        return tree_1_1x;
    }
  };

  return (
    <ModalContainer>
      <Modal
        open={props.open}
        onClose={() => props.handleClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {statusList[props.status]["title"]}
          </Typography>
          <img src={handleImage(members)} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {statusList[props.status]["detail"]}
            <br />
            {statusList[props.status]["detail2"]}
          </Typography>
          <ModalMemberContainer>
            <MdPeopleAlt />
            {props.list ? (
              <p className="mixMember">
                {members}/{props.list.min_party}
              </p>
            ) : (
              <></>
            )}
          </ModalMemberContainer>
          <PageButtonBox>
            <MoreParty onClick={move}>다른 스터디 보러가기</MoreParty>
            <CloseBtn onClick={() => props.handleClose(false)}>닫기</CloseBtn>
          </PageButtonBox>
        </Box>
      </Modal>
    </ModalContainer>
  );
}

const ModalContainer = styled.section`
  .join {
    background-color: black;
    color: white;
    width: 279px;
    height: 35px;
    line-height: 35px;
    border-radius: 25px;
  }
`;

const ModalMemberContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-top: 10px;

  .mixMember {
    margin-left: 10px;
  }
`;

const PageButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MoreParty = styled.button`
  width: 220px;
  height: 33px;
  margin-top: 12px;
  border-radius: 25px;
  border: 1px solid black;
  background-color: black;
  color: white;
`;

const CloseBtn = styled.button`
  width: 220px;
  height: 33px;
  margin-top: 12px;
  border-radius: 25px;
  border: 1px solid #e47b00;
  background-color: #fff;
  color: #e47b00;
`;
