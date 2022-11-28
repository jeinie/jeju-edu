import { useRef, useState } from "react";
import styled from "styled-components";
import { SearchIcon } from "@goorm-dev/gds-goormthon";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import axios from "axios";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Modal2 from "./Modal2";
import serverIP from "../config/config";
const AddressInput = ({ update }) => {
  const { kakao } = window;
  const [userAddress, setUserAddress] = useState(null);
  const location = useRef();
  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    axios
      .post(`/api/getStudyList`, { area: "성산읍" })
      .then((data) => update(data.data));
  };

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
      <div className="par_box" style={{ marginBottom: "12px" }}>
        <input placeholder="00동 00구" className="inputBox" ref={location} />
        <SearchIcon color="white" onClick={() => handleAddress()} />
      </div>
      <p
        style={{ marginLeft: "25px", marginRight: "25px", float: "left" }}
        onClick={handleClick}
      >
        {/* 위도경도를 주소로 변환하는 함수 적용 */}
        <MyLocationIcon style={{ marginRight: "10px" }} />
        현재 위치로 설정
      </p>
      <AccessAlarmIcon
        style={{ float: "right", marginRight: "25px", color: "red" }}
        onClick={() => setPopup(true)}
      />
      {popup && <Modal2 open={popup} setOpen={setPopup} />}
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
    margin-left: 25px;
    margin-right: 25px;
    height: 29px;
    border-radius: 25px;
    background: black;
  }
  .inputBox {
    border-radius: 25px;
    border: none;
    background: black;
    color: white;
  }
`;
