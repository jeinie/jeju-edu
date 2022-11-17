import React from "react";
import styled from "styled-components";
import { PlusIcon } from "@goorm-dev/gds-goormthon";
import { AiOutlinePlus } from "react-icons/ai";

export default function PlusBtn() {
  return (
    <PlusContainer>
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
  border: 1px solid black;
  font-size: 40px;

  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;

  .plus {
    display: flex;
    align-items: center;
  }
`;
