import styled from "styled-components";
import Spinner from "../img/spinner.svg";
const CustomSpinner = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoadingSpinner = () => {
  return (
    <CustomSpinner>
      <img alt="loading spinner" src={Spinner} />
    </CustomSpinner>
  );
};

export default LoadingSpinner;
