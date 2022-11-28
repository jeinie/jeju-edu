import { useRef, useState } from "react";
import styled from "styled-components";
import { SearchIcon } from "@goorm-dev/gds-goormthon";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import axios from "axios";
// import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Modal2 from "../modals/Modal2";
import serverIP from "../../config/config";

const AddressInput = ({ update }) => {
  // 주소를 입력하면 좌표값으로 바꿔주는 컴포넌트
  const { kakao } = window;
  const [userAddress, setUserAddress] = useState(null);
  const location = useRef();
  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    axios
      .post(`http://${serverIP.serverIP}/api/getStudyList`, { area: "성산읍" })
      .then((data) => update(data.data));
  };

  const handleChangeAddress = () => {
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
      <div className="par_box">
        <input placeholder="00동 00구" className="inputBox" ref={location} />
        <SearchIcon color="white" onClick={() => handleChangeAddress()} />
      </div>
      <div className="btnContainer">
        <p className="myLocation" onClick={handleClick}>
          {/* 위도경도를 주소로 변환하는 함수 적용 */}
          <MyLocationIcon className="myLocation" />
          현재 위치로 설정
        </p>
        {/* <AccessAlarmIcon onClick={() => setPopup(true)} className="alarm" /> */}
        {popup && <Modal2 open={popup} setOpen={setPopup} />}
      </div>
    </TestBox>
  );
};

export default AddressInput;

const TestBox = styled.div`
  .btnContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
  }
  .alarm {
    color: red;
  }

  .par_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    margin: 0 21px 12px 21px;
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
  .myLocation {
    margin-right: 10px;
  }
`;
