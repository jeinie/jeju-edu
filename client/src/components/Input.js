import styled from "styled-components";
import { SearchIcon } from "@goorm-dev/gds-goormthon";

const Input = () => {
  return (
    <TestBox>
      <div className="par_box">
        <input placeholder="00동 00구" className="inputBox" />
        <SearchIcon />
      </div>
    </TestBox>
  );
};

export default Input;

const TestBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  .par_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    width: 255px;
    height: 29px;
    border-radius: 25px;
    border: 1px solid #e47b00;
  }
  .inputBox {
    border-radius: 25px;
    border: none;
  }
`;
