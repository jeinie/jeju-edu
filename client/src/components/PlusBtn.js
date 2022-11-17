import React from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import {useState}  from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function PlusBtn() {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  
  return (
    <>
    <PlusContainer onClick={()=>setOpen(true)}>
      <div className="plus">
        <AiOutlinePlus />
      </div>

    </PlusContainer>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        </Box>
    </Modal>
    </>
  );
}

const PlusContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: white;
  background-color: #e47b00;
  font-size: 40px;
  position: fixed;
  top: 90%;
  left: 45%;

  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;

  .plus {
    display: flex;
    align-items: center;
  }
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};