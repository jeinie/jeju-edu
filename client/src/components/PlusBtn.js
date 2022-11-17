import React from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function PlusBtn() {

  const naviagate = useNavigate();

  return (
    <PlusContainer onClick={() => naviagate('/PartyJoin')}>
      <div className="plus">
        <AiOutlinePlus />
      </div>
    </PlusContainer>
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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
