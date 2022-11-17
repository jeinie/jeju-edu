import { useRef, useState } from "react";
import styled from "styled-components";
import { SearchIcon } from "@goorm-dev/gds-goormthon";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from "axios";

const AddressInput = () => {

  const { kakao } = window;
  const [userAddress, setUserAddress] = useState(null);
  const location = useRef();

  const handleAddress = () => {
    let geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      `${location.current.value}`,
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          setUserAddress(location);
          console.log(coords);
        } else {
          console.log("err");
        }
      }
    );
  };

  return (
    <TestBox>
      <div className="par_box" style={{marginBottom:'12px'}}>
        <input placeholder="00동 00구" className="inputBox" ref={location} />
        <SearchIcon color="white" onClick={() => handleAddress()}/>
      </div>
      <p style={{marginLeft:'25px', marginRight:'25px'}} ><MyLocationIcon style={{marginRight:'10px'}}/>현재 위치로 설정</p>
    </TestBox>
  );
};

export default AddressInput;

const TestBox = styled.div`
  .par_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin-left:25px;
    margin-right:25px;
    height: 29px;
    border-radius: 25px;
    background: black;
  }
  .inputBox {
    border-radius: 25px;
    border: none;
    background: black;
    color:white;
  }
`;
