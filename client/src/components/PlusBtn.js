import React from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function PlusBtn() {
  const navigate = useNavigate();

  return (
    <PlusContainer onClick={() => navigate("/PartyJoin")}>
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
  background-color: black;
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
