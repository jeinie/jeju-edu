import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MdPeopleAlt } from "react-icons/md";
import styled from "styled-components";

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

export default function BasicModal({ list }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>J-Join</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            스터디에 참여 완료!
          </Typography>
          <div>이미지 받아서 쓰기</div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            이제 내 나무에 물을 줄<br /> 스터디원을 기다리면 돼요!
          </Typography>
          <ModalMemberContainer>
            <MdPeopleAlt />
            <p className="mixMember">{list.members}/10</p>
          </ModalMemberContainer>
          <PageButtonBox>
            <MoreParty>다른 스터디 보러가기</MoreParty>
            <CloseBtn>닫기</CloseBtn>
          </PageButtonBox>
        </Box>
      </Modal>
    </div>
  );
}

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
`;

const CloseBtn = styled.button`
  width: 220px;
  height: 33px;
  margin-top: 12px;
  border-radius: 25px;
  border: 1px solid black;
`;
