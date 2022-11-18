import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import freshMandarin_1x from '../img/freshMandarin_1x.png';
import styled from "styled-components";
import { borderRadius } from '@mui/system';

export default function Modal2(props) {
  const handleClose = () => props.setOpen(false);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
        <button onClick={() => props.handleClose(false)}>click</button>
        <img src={freshMandarin_1x} style={{display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            marginTop:"150px",
            marginLeft:"75px"}}/>
        <button style={{
            height:"42px",
            marginLeft:"27px",
            marginRight:"27px",
            width:"84%",
            borderRadius:"15px",
            background:"#E47B00",
            color:"white"
        }} onClick={() => props.handleClose(false)}>열매를 수확해주세요.</button>
        </>
      </Modal>
    </div>
  );
}

const CloseBtn = styled.button`
  width: 220px;
  height: 33px;
  margin-top: 12px;
  border-radius: 25px;
  border: 1px solid #e47b00;
  background-color: #fff;
  color: #e47b00;
`;
